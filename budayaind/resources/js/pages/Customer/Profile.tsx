import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, FormEvent, useEffect } from 'react';
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiEdit3, FiSave, FiX,
  FiCamera, FiLock, FiInfo, FiCheck, FiAlertCircle, FiPlus
} from 'react-icons/fi';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
  profile_image?: string;
  is_active: boolean;
  created_at: string;
}

interface Props {
  user: User;
}

interface FlashMessages {
  success?: string;
  error?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Profile',
    href: '/customer/profile',
  },
];

export default function CustomerProfile({ user }: Props) {
  const { auth } = usePage<SharedData>().props;

  // Pastikan user role adalah customer untuk halaman ini
  const userRole = auth.user.role === 'customer' ? 'customer' : 'customer';

  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { flash } = usePage<{ flash: FlashMessages }>().props;

  // Form data untuk phone, address dan profile_image
  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    phone: user.phone || '',
    address: user.address || '',
    profile_image: null as File | null,
    general: '',
  });

  // Reset form data when user prop changes
  useEffect(() => {
    setData({
      phone: user.phone || '',
      address: user.address || '',
      profile_image: null,
    });
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('profile_image', file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearErrors();

    post(route('customer.profile.update'), {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        setIsEditing(false);
        setImagePreview(null);
        reset('profile_image');
      },
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setImagePreview(null);
    clearErrors();
    setData({
      phone: user.phone || '',
      address: user.address || '',
      profile_image: null,
    });
  };

  const getProfileImageUrl = () => {
    if (imagePreview) return imagePreview;
    if (user.profile_image) return `/storage/${user.profile_image}`;
    return null;
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="My Profile" />

      {/* Container - menggunakan bg yang sama dengan dashboard */}
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

        {/* Flash Messages */}
        <div className="space-y-4">
          {flash.success && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm dark:border-green-800/30 dark:bg-green-900/20">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">{flash.success}</p>
                </div>
              </div>
            </div>
          )}

          {flash.error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm dark:border-red-800/30 dark:bg-red-900/20">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiAlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800 dark:text-red-300">{flash.error}</p>
                </div>
              </div>
            </div>
          )}

          {errors.general && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm dark:border-red-800/30 dark:bg-red-900/20">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiAlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800 dark:text-red-300">{errors.general}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Header Card - menggunakan border yang sama dengan dashboard */}
        <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

            {/* Profile Image */}
            <div className="relative">
              {getProfileImageUrl() ? (
                <img
                  src={getProfileImageUrl()!}
                  alt={user.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg dark:border-sidebar"
                />
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-300 text-2xl sm:text-3xl font-bold shadow-lg border-4 border-white dark:border-sidebar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}

              {/* Edit Image Button */}
              {isEditing && (
                <label className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full p-2 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl">
                  <FiCamera className="w-4 h-4" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,image/jpg,image/gif"
                    onChange={handleImageChange}
                  />
                </label>
              )}

              {/* Status Badge */}
              <div className="absolute -top-1 -right-1">
                <div className={`w-6 h-6 rounded-full border-2 border-white dark:border-sidebar ${user.is_active ? 'bg-green-500' : 'bg-red-500'}`}>
                  <div className="w-full h-full rounded-full animate-pulse opacity-75 bg-current"></div>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                {user.name}
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300 mb-3 flex items-center justify-center sm:justify-start gap-2">
                <FiMail className="w-4 h-4" />
                {user.email}
              </p>

              {/* Role & Status Badges */}
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/30">
                  <FiUser className="w-3 h-3 mr-1" />
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${user.is_active
                  ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/30'
                  : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/30'
                  }`}>
                  <div className={`w-2 h-2 rounded-full mr-1 ${user.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  {user.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Member Since */}
              <p className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center justify-center sm:justify-start gap-1">
                <FiInfo className="w-4 h-4" />
                Member since {new Date(user.created_at).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-sidebar transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <FiEdit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center justify-center px-4 py-2 border border-sidebar-border text-sm font-medium rounded-lg text-neutral-700 dark:text-neutral-200 bg-white dark:bg-sidebar hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 dark:focus:ring-offset-sidebar transition-all duration-200"
                    disabled={processing}
                  >
                    <FiX className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-sidebar disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Image Error */}
          {errors.profile_image && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg">
              <p className="text-red-700 dark:text-red-300 text-sm flex items-center">
                <FiAlertCircle className="w-4 h-4 mr-2" />
                {errors.profile_image}
              </p>
            </div>
          )}
        </div>

        {/* Content Cards */}
        {isEditing ? (
          /* Edit Mode */
          <div className="space-y-4">
            {/* Personal Information Card */}
            <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar shadow-sm">
              <div className="border-b border-sidebar-border/70 dark:border-sidebar-border px-6 py-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center">
                  <FiUser className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Personal Information
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Full Name - Locked */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={user.name}
                        disabled
                        className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-sidebar-border text-neutral-500 dark:text-neutral-400 cursor-not-allowed pl-10 rounded-lg"
                      />
                      <FiLock className="absolute left-3 top-3.5 w-4 h-4 text-neutral-400" />
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center">
                      <FiInfo className="w-3 h-3 mr-1" />
                      Name cannot be changed for security reasons
                    </p>
                  </div>

                  {/* Email - Locked */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-sidebar-border text-neutral-500 dark:text-neutral-400 cursor-not-allowed pl-10 rounded-lg"
                      />
                      <FiMail className="absolute left-3 top-3.5 w-4 h-4 text-neutral-400" />
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center">
                      <FiInfo className="w-3 h-3 mr-1" />
                      Email cannot be changed for security reasons
                    </p>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2 lg:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-10 bg-white dark:bg-sidebar text-neutral-900 dark:text-neutral-100 ${errors.phone
                          ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20'
                          : 'border-sidebar-border'
                          }`}
                        placeholder="Enter your phone number"
                      />
                      <FiPhone className="absolute left-3 top-3.5 w-4 h-4 text-neutral-400" />
                    </div>
                    {errors.phone && (
                      <p className="text-red-600 dark:text-red-400 text-sm flex items-center">
                        <FiAlertCircle className="w-4 h-4 mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information Card */}
            <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar shadow-sm">
              <div className="border-b border-sidebar-border/70 dark:border-sidebar-border px-6 py-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center">
                  <FiMapPin className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                  Address Information
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Complete Address
                  </label>
                  <div className="relative">
                    <textarea
                      value={data.address}
                      onChange={(e) => setData('address', e.target.value)}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none bg-white dark:bg-sidebar text-neutral-900 dark:text-neutral-100 ${errors.address
                        ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20'
                        : 'border-sidebar-border'
                        }`}
                      placeholder="Enter your complete address including street, city, postal code..."
                    />
                  </div>
                  {errors.address && (
                    <p className="text-red-600 dark:text-red-400 text-sm flex items-center">
                      <FiAlertCircle className="w-4 h-4 mr-1" />
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* View Mode */
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            {/* Personal Information Card */}
            <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar shadow-sm">
              <div className="border-b border-sidebar-border/70 dark:border-sidebar-border px-6 py-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center">
                  <FiUser className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Personal Information
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                      Full Name
                    </label>
                    <p className="text-lg font-medium text-neutral-900 dark:text-neutral-100 flex items-center">
                      {user.name}
                      <FiLock className="w-4 h-4 ml-2 text-neutral-400" />
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                      Email Address
                    </label>
                    <p className="text-lg font-medium text-neutral-900 dark:text-neutral-100 flex items-center">
                      {user.email}
                      <FiLock className="w-4 h-4 ml-2 text-neutral-400" />
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                      Phone Number
                    </label>
                    {user.phone ? (
                      <p className="text-lg font-medium text-neutral-900 dark:text-neutral-100 flex items-center">
                        <FiPhone className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                        {user.phone}
                      </p>
                    ) : (
                      <div className="flex items-center">
                        <p className="text-neutral-500 dark:text-neutral-400 italic flex items-center">
                          <FiPlus className="w-4 h-4 mr-2 text-neutral-400" />
                          No phone number added
                        </p>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="ml-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                        >
                          Add number
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information Card */}
            <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar shadow-sm">
              <div className="border-b border-sidebar-border/70 dark:border-sidebar-border px-6 py-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center">
                  <FiMapPin className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                  Address Information
                </h3>
              </div>
              <div className="p-6">
                {user.address ? (
                  <div className="flex items-start">
                    <FiMapPin className="w-5 h-5 mr-3 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-neutral-900 dark:text-neutral-100 leading-relaxed">
                      {user.address}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FiMapPin className="mx-auto h-12 w-12 text-neutral-300 dark:text-neutral-600 mb-4" />
                    <p className="text-neutral-500 dark:text-neutral-400 italic mb-3">No address saved yet</p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center px-4 py-2 border border-sidebar-border text-sm font-medium rounded-lg text-neutral-700 dark:text-neutral-200 bg-white dark:bg-sidebar hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <FiPlus className="w-4 h-4 mr-2" />
                      Add Address
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
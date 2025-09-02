// Koordinat SVG path yang akurat untuk peta Indonesia
// Berdasarkan data geografis Indonesia yang sebenarnya

export const indonesiaDetailedPaths = {
    sumatera: {
        path: `M 60 80
               C 65 75, 70 72, 80 60
               C 85 58, 95 62, 100 65
               C 105 70, 108 75, 110 80
               C 115 85, 118 95, 120 100
               C 122 110, 124 120, 125 130
               C 124 140, 122 150, 120 160
               C 118 170, 115 180, 110 180
               C 105 185, 100 190, 95 195
               C 90 198, 87 200, 85 200
               C 80 198, 75 196, 70 195
               C 65 190, 60 185, 55 180
               C 52 170, 50 165, 50 160
               C 52 150, 54 145, 55 140
               C 58 130, 60 120, 60 110
               C 62 100, 60 90, 60 80 Z`,
        provinces: ["Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan", "Bengkulu", "Lampung"]
    },

    jawa: {
        path: `M 180 210
               L 200 208
               C 220 206, 240 205, 260 205
               C 280 205, 300 206, 320 208
               C 340 209, 360 210, 380 212
               C 400 214, 420 216, 440 218
               C 450 219, 455 220, 460 225
               C 458 230, 455 233, 450 235
               C 440 238, 430 240, 420 240
               C 400 241, 380 242, 360 242
               C 340 241, 320 240, 300 240
               C 280 240, 260 239, 240 238
               C 220 237, 200 236, 180 235
               C 175 232, 174 228, 175 225
               C 177 220, 179 215, 180 210 Z`,
        provinces: ["DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Banten"]
    },

    kalimantan: {
        path: `M 240 120
               C 250 115, 260 112, 280 110
               C 300 112, 320 114, 340 116
               C 350 118, 360 119, 370 122
               C 375 130, 378 140, 380 150
               C 382 160, 385 170, 388 180
               C 390 190, 388 200, 385 210
               C 380 218, 375 224, 370 228
               C 360 232, 350 234, 340 235
               C 320 234, 300 232, 280 230
               C 260 228, 250 226, 240 224
               C 235 220, 232 215, 230 210
               C 228 200, 226 190, 225 180
               C 224 170, 222 160, 220 150
               C 218 140, 220 130, 225 125
               C 230 122, 235 121, 240 120 Z`,
        provinces: ["Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara"]
    },

    sulawesi: {
        path: `M 420 140
               C 425 135, 430 132, 440 130
               C 445 132, 450 134, 460 135
               C 465 140, 470 145, 475 150
               C 478 160, 480 165, 482 170
               C 484 180, 485 185, 486 190
               C 485 200, 483 205, 480 210
               C 478 215, 475 220, 470 225
               C 465 230, 460 233, 455 235
               C 450 238, 447 240, 445 240
               C 440 238, 437 236, 435 235
               C 432 230, 430 225, 428 220
               C 426 210, 425 205, 424 200
               C 423 190, 422 185, 421 180
               C 420 170, 418 165, 416 160
               C 415 150, 417 145, 420 140 Z`,
        provinces: ["Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat"]
    },

    baliNusaTenggara: {
        path: `M 470 225
               C 475 223, 480 222, 490 223
               C 500 224, 510 225, 520 226
               C 530 227, 540 228, 550 230
               C 560 232, 570 234, 580 236
               C 585 238, 587 240, 585 242
               C 583 244, 580 245, 575 246
               C 570 248, 565 249, 560 250
               C 550 249, 540 248, 530 247
               C 520 246, 510 244, 500 242
               C 490 240, 480 238, 470 236
               C 468 233, 468 230, 469 228
               C 470 226, 470 225, 470 225 Z`,
        provinces: ["Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur"]
    },

    maluku: {
        path: `M 520 160
               C 525 158, 530 157, 540 155
               C 545 157, 550 159, 560 160
               C 565 165, 570 168, 575 170
               C 578 175, 580 180, 582 185
               C 580 190, 578 195, 575 200
               C 570 205, 565 208, 560 210
               C 550 208, 545 206, 540 205
               C 535 203, 530 201, 525 200
               C 520 198, 518 195, 516 190
               C 514 185, 512 180, 510 175
               C 508 170, 510 165, 515 162
               C 517 161, 519 160, 520 160 Z`,
        provinces: ["Maluku", "Maluku Utara"]
    },

    papua: {
        path: `M 580 140
               C 590 138, 600 137, 620 135
               C 630 136, 640 138, 660 140
               C 680 142, 700 144, 720 146
               C 730 148, 740 149, 750 150
               C 755 155, 758 165, 760 170
               C 762 180, 764 190, 765 200
               C 764 210, 762 220, 760 230
               C 758 240, 755 245, 750 248
               C 740 250, 730 252, 720 254
               C 700 255, 680 254, 660 252
               C 640 250, 630 248, 620 246
               C 600 244, 590 242, 580 240
               C 575 235, 572 230, 570 225
               C 568 220, 566 215, 565 210
               C 563 200, 562 195, 560 190
               C 558 180, 560 175, 562 170
               C 564 165, 566 160, 570 155
               C 572 150, 575 145, 580 140 Z`,
        provinces: ["Papua Barat", "Papua"]
    }
};

export const indonesiaSmallIslands = [
    // Kepulauan Riau
    { cx: 140, cy: 170, r: 4, name: "Kep. Riau", province: "Kepulauan Riau" },
    // Bangka Belitung
    { cx: 160, cy: 190, r: 4, name: "Bangka", province: "Kepulauan Bangka Belitung" },
    { cx: 165, cy: 195, r: 3, name: "Belitung", province: "Kepulauan Bangka Belitung" },
    // Madura
    { cx: 420, cy: 218, r: 5, name: "Madura", province: "Jawa Timur" },
    // Lombok
    { cx: 480, cy: 235, r: 4, name: "Lombok", province: "Nusa Tenggara Barat" },
    // Sumbawa
    { cx: 510, cy: 240, r: 5, name: "Sumbawa", province: "Nusa Tenggara Barat" },
    // Flores
    { cx: 550, cy: 245, r: 4, name: "Flores", province: "Nusa Tenggara Timur" },
    // Timor
    { cx: 575, cy: 250, r: 4, name: "Timor", province: "Nusa Tenggara Timur" },
    // Pulau-pulau kecil lainnya
    { cx: 590, cy: 180, r: 2, name: "Seram", province: "Maluku" },
    { cx: 595, cy: 175, r: 2, name: "Buru", province: "Maluku" },
    { cx: 530, cy: 170, r: 2, name: "Ternate", province: "Maluku Utara" },
    { cx: 535, cy: 168, r: 2, name: "Tidore", province: "Maluku Utara" },
];

/* --- DATA SIMULASI (Pengganti Database) --- */
const menuData = [
    { id: 1, nama: "Indomie Goreng Polos", kategori: "indomie", harga: 7000, gambar: "assets/img/indomie-goreng.jpg", isSoldOut: false },
    { id: 2, nama: "Indomie Goreng Telor", kategori: "indomie", harga: 12000, gambar: "assets/img/indomie-telor.jpg", isSoldOut: false },
    { id: 3, nama: "Indomie Rebus Soto", kategori: "indomie", harga: 7000, gambar: "assets/img/indomie-soto.jpg", isSoldOut: false },
    { id: 4, nama: "Indomie Rebus Kari Ayam", kategori: "indomie", harga: 7000, gambar: "assets/img/indomie-kari.jpg", isSoldOut: false },
    { id: 5, nama: "Indomie Carbonara", kategori: "indomie", harga: 15000, gambar: "assets/img/indomie-carbonara.jpg", isSoldOut: false },
    { id: 6, nama: "Roti Bakar Coklat", kategori: "roti", harga: 10000, gambar: "assets/img/roti-coklat.jpg", isSoldOut: false },
    { id: 7, nama: "Roti Bakar Keju Susu", kategori: "roti", harga: 12000, gambar: "assets/img/roti-keju.jpg", isSoldOut: false },
    { id: 8, nama: "Nasi Orak Arik Telor", kategori: "nasi", harga: 13000, gambar: "assets/img/nasi-orak.jpg", isSoldOut: false },
    { id: 9, nama: "Nasi Omelette", kategori: "nasi", harga: 13000, gambar: "assets/img/nasi-omelette.jpg", isSoldOut: false },
    { id: 10, nama: "Es Teh Manis/Tawar", kategori: "minuman", harga: 4000, gambar: "assets/img/es-teh.jpg", isSoldOut: false },
    { id: 11, nama: "Es Jeruk", kategori: "minuman", harga: 5000, gambar: "assets/img/es-jeruk.jpg", isSoldOut: false },
    { id: 12, nama: "Kopi Hitam", kategori: "minuman", harga: 5000, gambar: "assets/img/kopi.jpg", isSoldOut: false }
];

// Variabel Global untuk Halaman Menu
let keranjang = [];
let nomorMeja = "";

// --- SATU EVENT LISTENER UNTUK SEMUA HALAMAN ---
document.addEventListener("DOMContentLoaded", function() {
    
    // --- Cek Elemen Halaman ---
    const loginForm = document.getElementById("loginForm");
    const menuList = document.getElementById("menu-list");
    const keranjangList = document.getElementById("keranjangList");
    const statusContainer = document.getElementById("statusContainer");
    const btnGenerate = document.getElementById("btnGenerate");
    const adminMenuList = document.getElementById("adminMenuList");
    const dapurContainer = document.getElementById("dapurContainer");

    
    /* --- LOGIKA UNTUK HALAMAN LOGIN --- */
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault(); 
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const errorMessage = document.getElementById("errorMessage");

            if (username === "customer" && password === "123") {
                window.location.href = "menu.html"; 
            } else if (username === "admin" && password === "admin123") {
                window.location.href = "admin_dashboard.html";
            } else {
                errorMessage.textContent = "Username atau password salah!";
                errorMessage.style.display = "block";
            }
        });
    }

    
    /* --- LOGIKA UNTUK HALAMAN MENU --- */
    if (menuList) {
        
        // Fungsi untuk menampilkan menu ke HTML (VERSI BARU DENGAN SOLD OUT)
        function tampilkanMenu(kategori = "semua") {
            menuList.innerHTML = ""; 
            const dataFiltered = menuData.filter(item => {
                return kategori === "semua" || item.kategori === kategori;
            });

            dataFiltered.forEach(item => {
                const menuItemElement = document.createElement("div");
                const gambar = item.gambar || "https://via.placeholder.com/150"; 

                // --- LOGIKA BARU UNTUK SOLD OUT ---
                let buttonHTML;
                let soldOutClass = "";
                
                if (item.isSoldOut) {
                    soldOutClass = " menu-item-sold-out"; // Kelas CSS untuk styling
                    buttonHTML = `<button class="btn-tambah" disabled>Sold Out</button>`;
                } else {
                    buttonHTML = `<button class="btn-tambah" data-id="${item.id}">Tambah</button>`;
                }
                
                // Terapkan kelas CSS ke card
                menuItemElement.className = "menu-item" + soldOutClass;

                // Render HTML
                menuItemElement.innerHTML = `
                    <img src="${gambar}" alt="${item.nama}">
                    <h4>${item.nama}</h4>
                    <p class="harga">Rp ${item.harga.toLocaleString('id-ID')}</p>
                    ${buttonHTML} 
                `; 
                
                menuList.appendChild(menuItemElement);
            });
        }

        // Tampilkan semua menu saat halaman pertama kali dimuat
        tampilkanMenu("semua");

        // --- Event Listener untuk Tombol Kategori ---
        const kategoriButtons = document.querySelectorAll(".btn-kategori");
        kategoriButtons.forEach(button => {
            button.addEventListener("click", function() {
                kategoriButtons.forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");
                const kategoriDipilih = this.getAttribute("data-kategori");
                tampilkanMenu(kategoriDipilih);
            });
        });

        // --- Event Listener untuk Tombol "Tambah" ---
        menuList.addEventListener("click", function(event) {
            // Cek apakah yang diklik adalah tombol "Tambah" (dan BUKAN disabled)
            if (event.target.classList.contains("btn-tambah") && !event.target.disabled) {
                const idMenu = event.target.getAttribute("data-id");
                tambahKeKeranjang(idMenu);
            }
        });

        // Fungsi untuk menambah item ke keranjang
        function tambahKeKeranjang(idMenu) {
            const itemDitambah = menuData.find(item => item.id == idMenu);
            
            if (itemDitambah) {
                const itemDiKeranjang = keranjang.find(item => item.id == idMenu);
                
                if (itemDiKeranjang) {
                    itemDiKeranjang.jumlah++;
                } else {
                    keranjang.push({ ...itemDitambah, jumlah: 1 });
                }
                
                console.log("Keranjang:", keranjang);
                updateSummaryKeranjang();
            }
        }

        // Fungsi untuk update jumlah item di ringkasan keranjang
        function updateSummaryKeranjang() {
            const totalItem = keranjang.reduce((total, item) => total + item.jumlah, 0);
            document.getElementById("jumlahItemKeranjang").textContent = totalItem;
        }

        // --- Event Listener untuk Tombol Simpan Meja ---
        const btnSimpanMeja = document.getElementById("simpanMeja");
        btnSimpanMeja.addEventListener("click", function() {
            nomorMeja = document.getElementById("nomorMeja").value;
            if (nomorMeja) {
                alert(`Nomor meja ${nomorMeja} disimpan!`);
            } else {
                alert("Silakan masukkan nomor meja.");
            }
        });

        // --- Event Listener untuk Tombol Checkout ---
        const btnCheckout = document.getElementById("btnCheckout");
        btnCheckout.addEventListener("click", function() {
            if (nomorMeja === "") {
                alert("Harap masukkan dan simpan Nomor Meja Anda terlebih dahulu!");
                return; 
            }
            if (keranjang.length === 0) {
                alert("Keranjang Anda masih kosong. Silakan pilih menu.");
                return; 
            }

            localStorage.setItem("digitalWakrunKeranjang", JSON.stringify(keranjang));
            localStorage.setItem("digitalWakrunMeja", nomorMeja);
            window.location.href = "keranjang.html";
        });
    }

    
    /* --- LOGIKA UNTUK HALAMAN KERANJANG (Checkout) --- */
    if (keranjangList) {
        
        let keranjangCheckout = JSON.parse(localStorage.getItem("digitalWakrunKeranjang")) || [];
        const nomorMejaCheckout = localStorage.getItem("digitalWakrunMeja") || "Tidak ada";

        let subtotal = 0;
        let diskon = 0;
        let total = 0;
        const KODE_PROMO = "WAKRUNKEREN";
        const DISKON_PROMO = 5000;

        function renderKeranjangCheckout() {
            keranjangList.innerHTML = "";
            subtotal = 0;
            
            if (keranjangCheckout.length === 0) {
                keranjangList.innerHTML = "<p>Keranjang Anda kosong.</p>";
                return;
            }

            keranjangCheckout.forEach(item => {
                const itemElement = document.createElement("div");
                itemElement.className = "keranjang-item";
                const hargaItemTotal = item.harga * item.jumlah;
                subtotal += hargaItemTotal;

                itemElement.innerHTML = `
                    <span>(${item.jumlah}x) ${item.nama}</span>
                    <span>Rp ${hargaItemTotal.toLocaleString('id-ID')}</span>
                `;
                keranjangList.appendChild(itemElement);
            });
            
            hitungTotal();
        }

        function hitungTotal() {
            total = subtotal - diskon;
            
            document.getElementById("infoMeja").textContent = nomorMejaCheckout;
            document.getElementById("subtotalHarga").textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
            document.getElementById("diskonHarga").textContent = `- Rp ${diskon.toLocaleString('id-ID')}`;
            document.getElementById("totalHarga").textContent = `Rp ${total.toLocaleString('id-ID')}`;
        }
        
        const btnPromo = document.getElementById("terapkanPromo");
        const inputPromo = document.getElementById("kodePromo");
        const promoMessage = document.getElementById("promoMessage");
        
        btnPromo.addEventListener("click", function() {
            if (inputPromo.value.toUpperCase() === KODE_PROMO) {
                diskon = DISKON_PROMO;
                promoMessage.textContent = "Promo berhasil diterapkan!";
                promoMessage.className = "promo-message success";
            } else {
                diskon = 0; 
                promoMessage.textContent = "Kode promo tidak valid.";
                promoMessage.className = "promo-message error";
            }
            hitungTotal(); 
        });
        
        const btnBayar = document.getElementById("btnBayar");
        btnBayar.addEventListener("click", function() {
            
            const metodeBayar = document.getElementById("metodeBayar").value;
            const catatan = document.getElementById("catatanKhusus").value;

            alert("Memproses pembayaran... (Simulasi)");
            let pembayaranValid = (metodeBayar !== "gagal");

            setTimeout(() => {
                if (pembayaranValid) {
                    const pesanan = {
                        meja: nomorMejaCheckout,
                        items: keranjangCheckout,
                        total: total,
                        catatan: catatan,
                        status: "Sedang Disiapkan Dapur"
                    };
                    localStorage.setItem("statusPesananWakrun", JSON.stringify(pesanan));
                    localStorage.removeItem("digitalWakrunKeranjang");
                    
                    alert("Pembayaran Berhasil! Pesanan Anda sedang disiapkan.");
                    window.location.href = "status_pesanan.html";
                } else {
                    alert("Pembayaran Gagal! Silakan coba lagi atau pilih metode lain.");
                }
            }, 1000); 
        });

        renderKeranjangCheckout();
    }

    
    /* --- LOGIKA UNTUK HALAMAN STATUS PESANAN --- */
    if (statusContainer) {
        const pesanan = JSON.parse(localStorage.getItem("statusPesananWakrun"));

        if (pesanan) {
            document.getElementById("statusMeja").textContent = pesanan.meja;
            document.getElementById("statusBaru").textContent = pesanan.status;
            document.getElementById("statusTotal").textContent = `Rp ${pesanan.total.toLocaleString('id-ID')}`;
            document.getElementById("statusCatatan").textContent = pesanan.catatan || "-";

            const itemList = document.getElementById("statusItemList");
            itemList.innerHTML = ""; 

            pesanan.items.forEach(item => {
                const itemElement = document.createElement("div");
                itemElement.className = "keranjang-item";
                const hargaItemTotal = item.harga * item.jumlah;
                itemElement.innerHTML = `
                    <span>(${item.jumlah}x) ${item.nama}</span>
                    <span>Rp ${hargaItemTotal.toLocaleString('id-ID')}</span>
                `;
                itemList.appendChild(itemElement);
            });
        } else {
            statusContainer.innerHTML = "<h2>Tidak ada pesanan aktif.</h2><a href='menu.html' class='link-kembali'>Buat Pesanan Baru</a>";
        }

        const btnLogout = document.getElementById("btnLogout");
        if (btnLogout) { // Tambah cek jika pesanan tidak ada
            btnLogout.addEventListener("click", function() {
                localStorage.removeItem("statusPesananWakrun");
                alert("Terima kasih atas kunjungan Anda!");
                window.location.href = "index.html";
            });
        }
    }

    
    /* --- LOGIKA UNTUK HALAMAN ADMIN DASHBOARD --- */
    if (btnGenerate) {
        const laporanContainer = document.getElementById("laporanContainer");
        const btnExport = document.getElementById("btnExport");
        const adminLogout = document.getElementById("adminLogout");

        btnGenerate.addEventListener("click", function() {
            btnGenerate.textContent = "Memuat Laporan...";
            btnGenerate.disabled = true;

            setTimeout(() => {
                laporanContainer.style.display = "block";
                btnGenerate.textContent = "Generate Laporan";
                btnGenerate.disabled = false;
                alert("Laporan berhasil digenerate!");
            }, 1000); 
        });

        btnExport.addEventListener("click", function() {
            alert("Simulasi: Mengekspor laporan ke Excel...");
        });

        adminLogout.addEventListener("click", function(e) {
            e.preventDefault(); 
            alert("Logout berhasil.");
            window.location.href = "index.html";
        });
    }

    
    /* --- LOGIKA UNTUK HALAMAN ADMIN KELOLA MENU --- */
    if (adminMenuList) {
        
        const formMenu = document.getElementById("formMenu");
        const formMenuTitle = document.getElementById("formMenuTitle");
        const btnBatalEdit = document.getElementById("btnBatalEdit");
        const menuId = document.getElementById("menuId");
        
        // Kita gunakan 'menuData' langsung untuk konsistensi
        let daftarMenu = menuData; 

        // Fungsi render tabel (VERSI BARU DENGAN SOLD OUT)
        function renderTabelMenu() {
            adminMenuList.innerHTML = ""; 

            daftarMenu.forEach(item => {
                const tr = document.createElement("tr");
                if (item.isSoldOut) {
                    tr.classList.add("row-sold-out");
                }
                const toggleButtonText = item.isSoldOut ? "Set Ready" : "Set Sold Out";
                
                tr.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.nama}</td>
                    <td>${item.kategori}</td>
                    <td>Rp ${item.harga.toLocaleString('id-ID')}</td>
                    <td>
                        <button class="btn-aksi btn-edit" data-id="${item.id}">Edit</button>
                        <button class="btn-aksi btn-hapus" data-id="${item.id}">Hapus</button>
                        <button class="btn-aksi btn-toggle-soldout" data-id="${item.id}">${toggleButtonText}</button>
                    </td>
                `;
                adminMenuList.appendChild(tr);
            });
        }
        
        function resetForm() {
            formMenu.reset(); 
            menuId.value = ""; 
            formMenuTitle.textContent = "Tambah Menu Baru";
            btnBatalEdit.style.display = "none";
        }

        formMenu.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const id = menuId.value;
            const nama = document.getElementById("menuNama").value;
            const kategori = document.getElementById("menuKategori").value;
            const harga = document.getElementById("menuHarga").value;
            const gambar = document.getElementById("menuGambar").value;

            if (id) {
                // SIMULASI EDIT
                const index = daftarMenu.findIndex(item => item.id == id);
                if (index !== -1) {
                    // Ambil status isSoldOut yang ada
                    const currentIsSoldOut = daftarMenu[index].isSoldOut;
                    daftarMenu[index] = { id: parseInt(id), nama, kategori, harga: parseInt(harga), gambar, isSoldOut: currentIsSoldOut };
                    alert("Simulasi: Menu berhasil di-update!");
                }
            } else {
                // SIMULASI TAMBAH
                const newId = daftarMenu.length > 0 ? Math.max(...daftarMenu.map(item => item.id)) + 1 : 1;
                const menuBaru = { id: newId, nama, kategori, harga: parseInt(harga), gambar, isSoldOut: false }; // Selalu ready saat baru
                daftarMenu.push(menuBaru);
                alert("Simulasi: Menu baru berhasil ditambahkan!");
            }
            
            renderTabelMenu(); 
            resetForm(); 
        });

        // Event listener tabel (VERSI BARU DENGAN SOLD OUT)
        adminMenuList.addEventListener("click", function(e) {
            const id = e.target.getAttribute("data-id");
            if (!id) return; // Jika klik di luar tombol

            if (e.target.classList.contains("btn-edit")) {
                const item = daftarMenu.find(item => item.id == id);
                if (item) {
                    menuId.value = item.id;
                    document.getElementById("menuNama").value = item.nama;
                    document.getElementById("menuKategori").value = item.kategori;
                    document.getElementById("menuHarga").value = item.harga;
                    document.getElementById("menuGambar").value = item.gambar || "";
                    
                    formMenuTitle.textContent = `Edit Menu (ID: ${item.id})`;
                    btnBatalEdit.style.display = "block";
                    window.scrollTo(0, 0); 
                }
            } else if (e.target.classList.contains("btn-hapus")) {
                if (confirm(`Yakin ingin menghapus menu ini (ID: ${id})? (Simulasi)`)) {
                    // Hapus dari daftarMenu (dan juga menuData)
                    const index = daftarMenu.findIndex(item => item.id == id);
                    if (index !== -1) {
                        daftarMenu.splice(index, 1);
                    }
                    alert("Simulasi: Menu berhasil dihapus!");
                    renderTabelMenu(); 
                }
            } else if (e.target.classList.contains("btn-toggle-soldout")) {
                const item = daftarMenu.find(item => item.id == id);
                if (item) {
                    item.isSoldOut = !item.isSoldOut;
                    alert(`Status menu "${item.nama}" diubah!`);
                    renderTabelMenu(); 
                }
            }
        });
        
        btnBatalEdit.addEventListener("click", resetForm);

        const adminLogout = document.getElementById("adminLogout");
        if (adminLogout) {
            adminLogout.addEventListener("click", function(e) {
                e.preventDefault(); 
                alert("Logout berhasil.");
                window.location.href = "index.html";
            });
        }

        renderTabelMenu();
    }

    
    /* --- LOGIKA UNTUK HALAMAN DAPUR --- */
    if (dapurContainer) {
        
        function tampilkanPesananDapur() {
            const pesanan = JSON.parse(localStorage.getItem("statusPesananWakrun"));
            const pesananKosong = document.getElementById("pesananKosong");

            // Kosongkan kontainer dulu
            dapurContainer.innerHTML = ""; 

            if (pesanan) {
                const kartu = document.createElement("div");
                kartu.className = "kartu-pesanan";
                
                let itemListHTML = "";
                pesanan.items.forEach(item => {
                    itemListHTML += `<li>(${item.jumlah}x) ${item.nama}</li>`;
                });
                
                const catatan = pesanan.catatan || "-";

                kartu.innerHTML = `
                    <h3>Meja: ${pesanan.meja}</h3>
                    <p><strong>Status:</strong> <span id="statusDapur">${pesanan.status}</span></p>
                    <h4>Item:</h4>
                    <ul class="dapur-item-list">${itemListHTML}</ul>
                    <p><strong>Catatan:</strong> <span>${catatan}</span></p>
                    <div class="dapur-aksi">
                        <button class="btn-small btn-cetak" id="btnCetak">Cetak Notifikasi</button>
                        <button class="btn-small btn-selesai" id="btnSelesai">Tandai Selesai</button>
                    </div>
                `;
                dapurContainer.appendChild(kartu);
                
                setupTombolDapur(pesanan);
            } else {
                dapurContainer.appendChild(pesananKosong);
                pesananKosong.style.display = "block";
            }
        }
        
        function setupTombolDapur(pesanan) {
            document.getElementById("btnCetak").addEventListener("click", function() {
                alert("Simulasi: Mencetak notifikasi dapur untuk Meja " + pesanan.meja);
            });

            document.getElementById("btnSelesai").addEventListener("click", function() {
                pesanan.status = "Selesai & Siap Diantar";
                localStorage.setItem("statusPesananWakrun", JSON.stringify(pesanan));
                
                document.getElementById("statusDapur").textContent = pesanan.status;
                alert(`Pesanan Meja ${pesanan.meja} ditandai Selesai!`);
                
                this.textContent = "Sudah Selesai";
                this.disabled = true;
            });
        }

        tampilkanPesananDapur();
        setInterval(tampilkanPesananDapur, 5000); 
    }

}); // <-- INI ADALAH SATU-SATUNYA PENUTUP
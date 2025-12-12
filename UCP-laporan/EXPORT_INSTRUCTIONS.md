# Instruksi Export Diagram PlantUML ke Gambar

**Tanggal:** 12 Desember 2025  
**Untuk:** Tim Perancang Sistem Digital Wakrun

---

## 📋 Overview

Dokumen ini berisi instruksi lengkap untuk meng-export semua diagram PlantUML (file `.puml`) menjadi gambar PNG yang akan digunakan dalam Laporan Perancangan Sistem.

**Total Diagram:** 30 files  
**Format Output:** PNG  
**Folder Tujuan:** `UCP-laporan/preview-diagram/`

---

## 🎯 Metode Export

Pilih salah satu metode berikut sesuai dengan tools yang tersedia:

### Metode 1: VS Code PlantUML Extension (Recommended ⭐)

#### Prerequisites:
- VS Code installed
- PlantUML extension by jebbs installed

#### Steps:

1. **Install Extension** (jika belum):
   - Buka VS Code
   - Press `Cmd+Shift+X` (Mac) atau `Ctrl+Shift+X` (Windows)
   - Search "PlantUML"
   - Install extension by **jebbs**

2. **Export Single Diagram**:
   - Buka file `.puml` di VS Code
   - Press `Alt+D` untuk preview
   - Right-click pada preview window
   - Pilih **"Export Current Diagram"**
   - Pilih format **PNG**
   - Save ke folder yang sesuai di `preview-diagram/`

3. **Batch Export** (All diagrams):
   - Buka Command Palette (`Cmd+Shift+P` atau `Ctrl+Shift+P`)
   - Ketik: `PlantUML: Export Current File Diagrams`
   - Pilih format **PNG**
   - Export semua diagram dalam folder

#### Settings (Optional - Better Quality):
```json
// Add to VS Code settings.json
{
  "plantuml.exportFormat": "png",
  "plantuml.exportSubFolder": false,
  "plantuml.exportConcurrency": 3,
  "plantuml.exportMapFile": false
}
```

---

### Metode 2: PlantUML Online Server

#### Steps:

1. **Buka PlantUML Online**:
   - Go to: http://www.plantuml.com/plantuml/uml/

2. **Upload Diagram**:
   - Copy isi file `.puml`
   - Paste ke text area di website
   - Click **"Submit"**

3. **Download Image**:
   - Diagram akan ter-render
   - Right-click pada gambar
   - Save image as PNG
   - Simpan dengan nama yang sesuai ke folder `preview-diagram/`

**Kelebihan:** Tidak perlu install apapun  
**Kekurangan:** Harus manual satu-satu (30 files)

---

### Metode 3: Command Line (Jika PlantUML JAR tersedia)

#### Prerequisites:
- Java installed
- PlantUML JAR downloaded

#### Steps:

1. **Download PlantUML JAR**:
   ```bash
   cd ~/Downloads
   curl -L https://github.com/plantuml/plantuml/releases/download/v1.2024.7/plantuml-1.2024.7.jar -o plantuml.jar
   ```

2. **Export Single File**:
   ```bash
   java -jar ~/Downloads/plantuml.jar -tpng UCP-laporan/01_use_case_diagram.puml
   ```

3. **Batch Export All**:
   ```bash
   java -jar ~/Downloads/plantuml.jar -tpng "UCP-laporan/*.puml"
   ```

4. **Move to Correct Folders**:
   ```bash
   # Example for use case
   mv UCP-laporan/01_use_case_diagram.png UCP-laporan/preview-diagram/01_use_case/
   ```

---

## 📁 File Organization

Setelah export, organize files sesuai struktur berikut:

```
UCP-laporan/preview-diagram/
├── 01_use_case/
│   └── use_case_diagram.png
├── 02_activity/
│   ├── activity_overall.png          (dari 02_activity_diagram.puml)
│   ├── activity_ordering.png         (dari 02a_activity_ordering.puml)
│   ├── activity_payment.png          (dari 02b_activity_payment.puml)
│   └── activity_kitchen.png          (dari 02c_activity_kitchen.puml)
├── 03_state_machine/
│   └── state_machine.png
├── 04_sequence/
│   ├── sequence_overall.png          (dari 04_sequence_diagram.puml)
│   ├── sequence_checkout_cart.png    (dari 04a_sequence_checkout_cart.puml)
│   ├── sequence_promo.png            (dari 04b_sequence_promo.puml)
│   ├── sequence_order_creation.png   (dari 04c_sequence_order_creation.puml)
│   ├── sequence_payment.png          (dari 04d_sequence_payment.puml)
│   └── sequence_notification.png     (dari 04e_sequence_notification.puml)
├── 05_communication/
│   └── communication_diagram.png
├── 06_timing/
│   └── timing_diagram.png
├── 07_class/
│   ├── class_overall.png             (dari 07_class_diagram.puml)
│   ├── class_core_domain.png         (dari 07a_class_core_domain.puml)
│   ├── class_payment_promo.png       (dari 07b_class_payment_promo.puml)
│   ├── class_kitchen_notification.png (dari 07c_class_kitchen_notification.puml)
│   └── class_services.png            (dari 07d_class_services.puml)
├── 08_object/
│   └── object_diagram.png
├── 09_component/
│   ├── component_overall.png         (dari 09_component_diagram.puml)
│   ├── component_highlevel.png       (dari 09a_component_highlevel.puml)
│   └── component_business_logic.png  (dari 09b_component_business_logic.puml)
├── 10_composite/
│   └── composite_structure.png
├── 11_package/
│   ├── package_overall.png           (dari 11_package_diagram.puml)
│   ├── package_toplevel.png          (dari 11a_package_toplevel.puml)
│   └── package_domain_detail.png     (dari 11b_package_domain_detail.puml)
├── 12_deployment/
│   └── deployment_diagram.png
├── 13_interaction/
│   └── interaction_overview.png
└── 14_profile/
    └── profile_diagram.png
```

---

## ✅ Checklist Export

Gunakan checklist ini untuk memastikan semua diagram sudah di-export:

### Behavioral Diagrams (7 types, 16 files)
- [ ] 01_use_case_diagram.puml → `01_use_case/use_case_diagram.png`
- [ ] 02_activity_diagram.puml → `02_activity/activity_overall.png`
- [ ] 02a_activity_ordering.puml → `02_activity/activity_ordering.png`
- [ ] 02b_activity_payment.puml → `02_activity/activity_payment.png`
- [ ] 02c_activity_kitchen.puml → `02_activity/activity_kitchen.png`
- [ ] 03_state_machine_diagram.puml → `03_state_machine/state_machine.png`
- [ ] 04_sequence_diagram.puml → `04_sequence/sequence_overall.png`
- [ ] 04a_sequence_checkout_cart.puml → `04_sequence/sequence_checkout_cart.png`
- [ ] 04b_sequence_promo.puml → `04_sequence/sequence_promo.png`
- [ ] 04c_sequence_order_creation.puml → `04_sequence/sequence_order_creation.png`
- [ ] 04d_sequence_payment.puml → `04_sequence/sequence_payment.png`
- [ ] 04e_sequence_notification.puml → `04_sequence/sequence_notification.png`
- [ ] 05_communication_diagram.puml → `05_communication/communication_diagram.png`
- [ ] 06_timing_diagram.puml → `06_timing/timing_diagram.png`
- [ ] 13_interaction_overview_diagram.puml → `13_interaction/interaction_overview.png`

### Structural Diagrams (7 types, 14 files)
- [ ] 07_class_diagram.puml → `07_class/class_overall.png`
- [ ] 07a_class_core_domain.puml → `07_class/class_core_domain.png`
- [ ] 07b_class_payment_promo.puml → `07_class/class_payment_promo.png`
- [ ] 07c_class_kitchen_notification.puml → `07_class/class_kitchen_notification.png`
- [ ] 07d_class_services.puml → `07_class/class_services.png`
- [ ] 08_object_diagram.puml → `08_object/object_diagram.png`
- [ ] 09_component_diagram.puml → `09_component/component_overall.png`
- [ ] 09a_component_highlevel.puml → `09_component/component_highlevel.png`
- [ ] 09b_component_business_logic.puml → `09_component/component_business_logic.png`
- [ ] 10_composite_structure_diagram.puml → `10_composite/composite_structure.png`
- [ ] 11_package_diagram.puml → `11_package/package_overall.png`
- [ ] 11a_package_toplevel.puml → `11_package/package_toplevel.png`
- [ ] 11b_package_domain_detail.puml → `11_package/package_domain_detail.png`
- [ ] 12_deployment_diagram.puml → `12_deployment/deployment_diagram.png`
- [ ] 14_profile_diagram.puml → `14_profile/profile_diagram.png`

**Total:** 30 diagram files

---

## 🔧 Troubleshooting

### Error: "Cannot find PlantUML"
**Solution:** Install PlantUML extension di VS Code atau download PlantUML JAR

### Error: "Syntax Error in Diagram"
**Solution:** 
1. Check error message di PlantUML preview
2. Refer to error fix reports di folder `.gemini/antigravity/brain/`
3. All diagrams sudah di-fix, seharusnya tidak ada error

### Image Quality Rendah
**Solution:**
- Gunakan export dengan DPI lebih tinggi
- Di VS Code settings: `"plantuml.exportOutDir": "preview-diagram"`
- Command line: `java -jar plantuml.jar -tpng -SdefaultFontSize=14`

### Diagram Terlalu Besar / Terpotong
**Solution:**
- Gunakan SVG format (scalable): `-tsvg` instead of `-tpng`
- Atau increase image size: `-DPLANTUML_LIMIT_SIZE=8192`

---

## 📊 Quality Check

Setelah export semua diagram, verify:

1. **File Count**:
   ```bash
   find UCP-laporan/preview-diagram -name "*.png" | wc -l
   ```
   Expected: 30 files

2. **Folder Structure**:
   ```bash
   ls UCP-laporan/preview-diagram/
   ```
   Expected: 14 folders

3. **Image Viewability**:
   - Open each image
   - Verify text is readable
   - Check no parts are cut off
   - Confirm colors are visible

4. **File Naming**:
   - Check names match the organization structure above
   - Consistent naming convention
   - No spaces in filenames

---

## 🎓 Tips

1. **Batch Processing:** Export all diagrams at once menggunakan VS Code batch export
2. **Quality:** Gunakan PNG dengan resolution 300 DPI untuk print quality
3. **Size:** SVG format lebih baik untuk scalability tapi PNG lebih universal
4. **Backup:** Keep original `.puml` files - images hanya untuk presentation

---

## ✅ Next Steps

Setelah semua diagram ter-export:
1. Verify all 30 images ada di folder yang benar
2. Check image quality dan readability
3. Buka `LAPORAN_PERANCANGAN_SISTEM.md`
4. Verify all images ter-embed dengan benar di laporan
5. Review laporan secara keseluruhan

---

**Prepared by:** System Designer Team  
**Last Updated:** 12 Desember 2025  
**Version:** 1.0

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Roots Super Speciality Dental Clinic database...');

  // 1. Clear existing records safely
  await prisma.auditLog.deleteMany();
  await prisma.contactEnquiry.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.treatment.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.review.deleteMany();
  await prisma.galleryItem.deleteMany();
  await prisma.beforeAfter.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.openingHour.deleteMany();
  await prisma.holiday.deleteMany();
  await prisma.clinicSetting.deleteMany();
  await prisma.admin.deleteMany();

  // 2. Admin User
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('RootsAdmin2026!', salt);

  const admin = await prisma.admin.create({
    data: {
      email: 'admin@rootsdental.com',
      password: hashedPassword,
      name: 'Roots Dental Administrator',
      role: 'SUPER_ADMIN',
    },
  });
  console.log(`✅ Admin created: ${admin.email}`);

  // 3. Clinic Settings
  const settings = await prisma.clinicSetting.create({
    data: {
      id: 'default',
      clinicName: 'ROOTS SUPER SPECIALITY DENTAL CLINIC',
      tagline: 'Advanced Dental Care • Precision, Comfort & Technology',
      phone: '+91 98765 43210',
      whatsAppNumber: '+919876543210',
      email: 'contact@rootsdental.com',
      emergencyPhone: '+91 98765 43210',
      address: 'Darga Road, near NIT, Revenue Colony, Subedari, Kazipet, Hanamkonda, Telangana 506004',
      googleMapsUrl: 'https://maps.google.com/?q=Roots+Super+Speciality+Dental+Clinic+Darga+Road+Kazipet+Hanamkonda+506004',
      embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.675765038162!2d79.531238475179!3d17.994464883002636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a334f59c8888889%3A0x8888888888888888!2sRoots%20Super%20Speciality%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
      noticeBanner: 'Welcoming New Patients • Prioritize Your Oral Health Today',
    },
  });
  console.log(`✅ Clinic settings initialized`);

  // 4. Opening Hours
  const days = [
    { dayOfWeek: 'Monday', openTime: '09:30 AM', closeTime: '08:30 PM', isClosed: false, sortOrder: 1 },
    { dayOfWeek: 'Tuesday', openTime: '09:30 AM', closeTime: '08:30 PM', isClosed: false, sortOrder: 2 },
    { dayOfWeek: 'Wednesday', openTime: '09:30 AM', closeTime: '08:30 PM', isClosed: false, sortOrder: 3 },
    { dayOfWeek: 'Thursday', openTime: '09:30 AM', closeTime: '08:30 PM', isClosed: false, sortOrder: 4 },
    { dayOfWeek: 'Friday', openTime: '09:30 AM', closeTime: '08:30 PM', isClosed: false, sortOrder: 5 },
    { dayOfWeek: 'Saturday', openTime: '09:30 AM', closeTime: '08:30 PM', isClosed: false, sortOrder: 6 },
    { dayOfWeek: 'Sunday', openTime: '10:00 AM', closeTime: '02:00 PM', isClosed: false, sortOrder: 7 },
  ];

  for (const day of days) {
    await prisma.openingHour.create({ data: day });
  }
  console.log(`✅ Weekly clinic hours set`);

  // 5. Doctors
  const doctorsData = [
    {
      name: 'Dr. Lead Dental Specialist',
      qualifications: 'BDS, MDS (Endodontics & Conservative Dentistry)',
      specialization: 'Chief Endodontist & Microscopic Root Canal Specialist',
      experience: 'Specialist in Precision Endodontics',
      bio: 'Dedicated to preserving natural tooth structure using advanced rotary endodontics, digital apex locators, and conservative restorative techniques with utmost patient comfort.',
      imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
      availableDays: 'Mon,Tue,Wed,Thu,Fri,Sat',
      sortOrder: 1,
    },
    {
      name: 'Dr. Consultant Implantologist',
      qualifications: 'BDS, MDS (Periodontics & Oral Implantology)',
      specialization: 'Senior Implantologist & Periodontist',
      experience: 'Specialist in Full-Mouth Restorations',
      bio: 'Expert in modern titanium and zirconia implant placement, bone grafting procedures, and comprehensive gum health restoration.',
      imageUrl: 'https://images.unsplash.com/photo-1594824813628-482200234a91?auto=format&fit=crop&w=600&q=80',
      availableDays: 'Mon,Wed,Fri,Sat',
      sortOrder: 2,
    },
    {
      name: 'Dr. Consultant Orthodontist',
      qualifications: 'BDS, MDS (Orthodontics & Dentofacial Orthopedics)',
      specialization: 'Orthodontist & Clear Aligner Specialist',
      experience: 'Specialist in Digital Smile Alignment',
      bio: 'Focuses on modern self-ligating braces, ceramic aligners, and clear aligner therapies for both adolescents and adults.',
      imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
      availableDays: 'Tue,Thu,Sat,Sun',
      sortOrder: 3,
    },
    {
      name: 'Dr. Pediatric Dental Associate',
      qualifications: 'BDS, MDS (Pediatric & Preventive Dentistry)',
      specialization: 'Pediatric Dental Specialist',
      experience: 'Child Dental Healthcare',
      bio: 'Passionate about creating pleasant, fear-free dental visits for children, preventive sealants, fluoride treatments, and gentle restorations.',
      imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
      availableDays: 'Mon,Tue,Wed,Thu,Fri,Sat',
      sortOrder: 4,
    },
  ];

  const createdDoctors = [];
  for (const doc of doctorsData) {
    const created = await prisma.doctor.create({ data: doc });
    createdDoctors.push(created);
  }
  console.log(`✅ ${createdDoctors.length} Doctors seeded`);

  // 6. Confirmed 10 Treatments
  const treatmentsData = [
    {
      slug: 'root-canal',
      name: 'Root Canal Treatment',
      category: 'Endodontics',
      summary: 'Precision-focused treatment for infected or damaged teeth to relieve pain and preserve your natural tooth.',
      description: 'Root Canal Treatment (RCT) is a precision procedure designed to eliminate bacteria from an infected root canal, prevent reinfection, and save the natural tooth. At Roots Dental Clinic, we utilize advanced rotary systems and digital apex locators for high precision and maximum patient comfort.',
      indications: JSON.stringify([
        'Severe toothache when chewing or applying pressure',
        'Prolonged sensitivity to hot or cold temperatures',
        'Discoloration or darkening of the affected tooth',
        'Swelling and tenderness in nearby gums',
        'Persistent or recurring pimple on the gums',
      ]),
      procedureSteps: JSON.stringify([
        { step: '01', title: 'Digital Diagnostic X-Ray', desc: 'High-resolution imaging to evaluate the exact root anatomy and infection spread.' },
        { step: '02', title: 'Gentle Local Anesthesia', desc: 'Ensuring the entire procedure is relaxed and comfortable.' },
        { step: '03', title: 'Pulp Removal & Disinfection', desc: 'Careful removal of infected pulpal tissue and thorough canal sterilization.' },
        { step: '04', title: 'Canal Shaping & Sealing', desc: 'Bio-compatible gutta-percha filling seals the canals hermetically.' },
        { step: '05', title: 'Crown Restoration', desc: 'Custom crown placement to restore full biting strength and natural appearance.' },
      ]),
      benefits: JSON.stringify([
        'Saves the natural tooth from extraction',
        'Relieves chronic dental pain and throbbing discomfort',
        'Restores natural biting and chewing efficiency',
        'Prevents infection from spreading to adjacent jawbone',
        'Long-lasting solution with proper crown and oral hygiene',
      ]),
      recoveryInfo: 'Mild soreness for 24-48 hours is normal and easily managed with prescribed medication. Avoid chewing hard foods on the treated side until the permanent crown is placed.',
      faqs: JSON.stringify([
        { q: 'Is root canal treatment painful?', a: 'Modern root canal therapy at Roots Dental is performed under gentle local anesthesia and is comparable to getting a standard filling.' },
        { q: 'How many visits does RCT take?', a: 'Many root canals can be completed in a single visit, while teeth with active infection may require 2 structured appointments for complete sterilization.' },
        { q: 'Why is a crown necessary after root canal?', a: 'After a root canal, the tooth loses its blood supply and can become brittle over time. A custom dental crown protects it from fracture and restores full chewing function.' },
      ]),
      iconName: 'ShieldAlert',
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      featured: true,
      sortOrder: 1,
    },
    {
      slug: 'dental-implants',
      name: 'Dental Implants',
      category: 'Implantology',
      summary: 'Modern, permanent tooth-replacement solutions that look, feel, and function just like natural teeth.',
      description: 'Dental implants are medical-grade titanium posts surgically positioned into the jawbone beneath your gums to securely mount replacement teeth or bridges. They offer the highest stability and prevent bone loss associated with missing teeth.',
      indications: JSON.stringify([
        'Single or multiple missing teeth',
        'Difficulty chewing food comfortably',
        'Unstable or uncomfortable removable dentures',
        'Desire to prevent facial sagging caused by jawbone shrinkage',
      ]),
      procedureSteps: JSON.stringify([
        { step: '01', title: '3D Bone & Diagnostic Assessment', desc: 'Digital planning to determine precise implant placement angle and bone density.' },
        { step: '02', title: 'Implant Post Placement', desc: 'Gentle surgical placement of the biocompatible titanium post in the jaw.' },
        { step: '03', title: 'Osseointegration Period', desc: 'Natural biological bonding of the bone to the implant surface.' },
        { step: '04', title: 'Abutment & Custom Crown', desc: 'Precision-milled ceramic crown matched seamlessly to adjacent natural teeth.' },
      ]),
      benefits: JSON.stringify([
        'Permanent and durable tooth replacement',
        'Preserves facial structure and halts jawbone loss',
        'No damage to adjacent healthy natural teeth',
        'Restores 100% natural chewing force',
      ]),
      recoveryInfo: 'Initial healing occurs within 3-7 days. Soft food diet is recommended for the first few days following placement.',
      faqs: JSON.stringify([
        { q: 'How long do dental implants last?', a: 'With proper oral hygiene and regular dental checkups, dental implants can last a lifetime.' },
        { q: 'Am I a candidate for dental implants?', a: 'Most adults with adequate jawbone density and healthy gums are great candidates. A clinical consultation and 3D scan confirm suitability.' },
      ]),
      iconName: 'Sparkles',
      imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
      featured: true,
      sortOrder: 2,
    },
    {
      slug: 'teeth-cleaning',
      name: 'Teeth Cleaning & Scaling',
      category: 'Preventive Care',
      summary: 'Professional oral hygiene, ultrasonic tartar removal, and comprehensive preventive periodontal care.',
      description: 'Professional teeth cleaning removes hardened calculus (tartar) and stubborn plaque deposits that routine brushing cannot reach. It protects gum tissue from gingivitis, prevents periodontitis, and eliminates bad breath.',
      indications: JSON.stringify([
        'Bleeding gums during brushing or flossing',
        'Visible yellowish or brownish tartar buildup',
        'Persistent bad breath (halitosis)',
        'Routine 6-month preventive maintenance',
      ]),
      procedureSteps: JSON.stringify([
        { step: '01', title: 'Oral & Periodontal Exam', desc: 'Thorough evaluation of gum pockets and tooth surfaces.' },
        { step: '02', title: 'Ultrasonic Scaling', desc: 'Gentle vibrational water scaling to break down hardened tartar without harming enamel.' },
        { step: '03', title: 'Prophylaxis Polishing', desc: 'Enamel polishing to smooth surfaces and remove surface micro-stains.' },
        { step: '04', title: 'Oral Hygiene Guidance', desc: 'Personalized flossing and brushing technique review for home care.' },
      ]),
      benefits: JSON.stringify([
        'Prevents gum disease and tooth loss',
        'Removes tough coffee, tea, and tobacco stains',
        'Refreshes breath and oral freshness',
        'Protects overall systemic cardiovascular health',
      ]),
      recoveryInfo: 'No downtime required. Avoid staining drinks (like turmeric, tea, coffee) for 2-3 hours after polishing.',
      faqs: JSON.stringify([
        { q: 'Does teeth cleaning make teeth loose?', a: 'No, this is a myth. Scaling removes calculus that was artificially holding infected gums. Once cleaned, gums heal and tighten around the tooth.' },
        { q: 'How often should I get teeth cleaned?', a: 'Dentists recommend professional cleaning every 6 months for optimal gum and tooth health.' },
      ]),
      iconName: 'Activity',
      imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
      featured: true,
      sortOrder: 3,
    },
    {
      slug: 'teeth-whitening',
      name: 'Teeth Whitening',
      category: 'Cosmetic Dentistry',
      summary: 'Clinical cosmetic treatment for a brighter, radiant smile using safe, enamel-friendly formulations.',
      description: 'Professional in-office teeth whitening safely lifts deep intrinsic and extrinsic enamel stains caused by age, food, beverages, and smoking, delivering noticeable brightness in a single relaxing session.',
      indications: JSON.stringify([
        'Yellowed or discolored teeth',
        'Extrinsic staining from tea, coffee, or wine',
        'Preparation for special occasions, weddings, or interviews',
        'Desire for a rejuvenated, radiant smile',
      ]),
      procedureSteps: JSON.stringify([
        { step: '01', title: 'Shade Assessment', desc: 'Recording baseline enamel shade using a calibrated medical dental shade guide.' },
        { step: '02', title: 'Gingival Barrier Protection', desc: 'Application of a protective resin barrier to safeguard sensitive gum tissue.' },
        { step: '03', title: 'Whitening Gel Activation', desc: 'Medical-grade whitening formulation activated for optimal stain dissolution.' },
        { step: '04', title: 'Final Fluoride Nourishment', desc: 'Desensitizing treatment to ensure minimal post-whitening sensitivity.' },
      ]),
      benefits: JSON.stringify([
        'Significantly whiter smile in under 60 minutes',
        'Completely safe for dental enamel under professional care',
        'Boosts personal confidence and aesthetic appeal',
        'Uniform, even shade improvement across all visible teeth',
      ]),
      recoveryInfo: 'Follow the "white diet" (avoid dark gravies, soy sauce, coffee, and red wine) for 48 hours to lock in optimal brightness.',
      faqs: JSON.stringify([
        { q: 'Does teeth whitening damage enamel?', a: 'No. Professional in-clinic whitening uses controlled pH-balanced solutions that safely oxygenate stain molecules without degrading enamel.' },
        { q: 'How long do whitening results last?', a: 'Results typically last 1 to 2 years depending on diet, brushing habits, and periodic touch-ups.' },
      ]),
      iconName: 'Smile',
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      featured: true,
      sortOrder: 4,
    },
    {
      slug: 'braces',
      name: 'Braces & Orthodontics',
      category: 'Orthodontics',
      summary: 'Comprehensive tooth alignment and bite correction solutions including metal, ceramic braces, and clear aligners.',
      description: 'Orthodontic therapy corrects malaligned teeth, crowding, spacing, and irregular bite relationships. Our orthodontic specialists offer metal braces, discreet ceramic brackets, and cutting-edge transparent aligners.',
      indications: JSON.stringify([
        'Crowded or overlapping teeth',
        'Gaps and irregular spacing between teeth',
        'Overbite, underbite, crossbite, or open bite',
        'Jaw alignment issues causing uneven tooth wear',
      ]),
      procedureSteps: JSON.stringify([
        { step: '01', title: 'Orthodontic Consultation', desc: 'Detailed facial photography, digital impressions, and cephalometric analysis.' },
        { step: '02', title: 'Customized Treatment Plan', desc: 'Digital simulation of predicted tooth movements and estimated timeline.' },
        { step: '03', title: 'Brackets / Aligner Fitting', desc: 'Gentle bonding of brackets or delivery of first set of custom clear aligners.' },
        { step: '04', title: 'Periodic Adjustments', desc: 'Scheduled monthly checkups to progress through alignment phases.' },
        { step: '05', title: 'Retainer Phase', desc: 'Custom retainers to stabilize the teeth permanently in their ideal alignment.' },
      ]),
      benefits: JSON.stringify([
        'Significantly easier oral hygiene and brushing',
        'Harmonious facial aesthetics and balanced smile profile',
        'Prevents abnormal tooth wear and TMJ strain',
        'Suitable for children, teens, and adults',
      ]),
      recoveryInfo: 'Mild pressure sensation for 2-3 days after monthly bracket tightening or switching aligner trays, easily managed with soft foods.',
      faqs: JSON.stringify([
        { q: 'What is the best age for braces?', a: 'Orthodontic evaluation is ideal starting at age 7, but adult orthodontic treatment is equally effective and very common today.' },
        { q: 'What are clear aligners?', a: 'Clear aligners are removable, nearly invisible custom trays that gently shift teeth without metal wires or brackets.' },
      ]),
      iconName: 'AlignJustify',
      imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
      featured: true,
      sortOrder: 5,
    },
    {
      slug: 'wisdom-tooth-removal',
      name: 'Wisdom Tooth Removal',
      category: 'Oral Surgery',
      summary: 'Precision evaluation and gentle surgical removal for impacted or painful third molars.',
      description: 'Wisdom teeth (third molars) frequently lack adequate space to erupt properly, leading to impaction, pericoronitis, cyst formation, or damage to adjacent molars. Our oral surgeons perform atraumatic wisdom tooth extractions with gentle surgical protocols.',
      indications: JSON.stringify([
        'Intense pain or swelling at the back of the jaw',
        'Difficulty opening the mouth (trismus)',
        'Food trapping and cavity formation behind the second molar',
        'Partially erupted tooth with recurrent gum infections',
      ]),
      procedureSteps: JSON.stringify([
        { step: '01', title: 'OPG / Digital X-Ray Mapping', desc: 'Assessing root curvature and proximity to mandibular nerve canals.' },
        { step: '02', title: 'Deep Local Anesthesia', desc: 'Complete numbing of the surgical area for a pain-free experience.' },
        { step: '03', title: 'Precision Removal', desc: 'Careful sectioning and gentle extraction preserving surrounding bone.' },
        { step: '04', title: 'Suturing & Gauze Pack', desc: 'Placement of fine sutures to promote clean, rapid tissue healing.' },
      ]),
      benefits: JSON.stringify([
        'Permanent relief from recurrent back-jaw pain',
        'Protects adjacent healthy molars from root resorption and decay',
        'Prevents orthodontic crowding relapse',
        'Eliminates chronic gum inflammation and pericoronal infections',
      ]),
      recoveryInfo: 'Apply cold packs on the cheek for 24 hours. Eat soft, cool foods (ice cream, yogurt, khichdi) and avoid using straws for 3 days to protect the healing blood clot.',
      faqs: JSON.stringify([
        { q: 'Will wisdom tooth extraction hurt?', a: 'You will feel pressure during the procedure but no sharp pain thanks to effective local anesthesia.' },
        { q: 'How long is recovery after wisdom tooth surgery?', a: 'Most patients return to normal routine within 2 to 3 days, with complete gum tissue closure occurring within 10-14 days.' },
      ]),
      iconName: 'ZapOff',
      imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
      featured: false,
      sortOrder: 6,
    },
    {
      slug: 'tooth-extraction',
      name: 'Tooth Extraction',
      category: 'Oral Surgery',
      summary: 'Atraumatic, gentle tooth removal when preservation is not clinically viable, with immediate socket preservation.',
      description: 'When a tooth is severely decayed beyond repair, extensively fractured below the gumline, or compromised by advanced bone loss, safe extraction is performed to prevent systemic infection and prepare the site for future restorative care.',
      indications: JSON.stringify([
        'Severe tooth decay extending below bone level',
        'Advanced periodontal disease with non-restorable mobility',
        'Irreparable vertical tooth fracture',
        'Severe dental trauma',
      ]),
      procedureSteps: JSON.stringify([
        { step: '01', title: 'Clinical & X-Ray Examination', desc: 'Confirming non-restorability and planning atraumatic extraction.' },
        { step: '02', title: 'Local Anesthesia', desc: 'Ensuring total numbness around the tooth and gum.' },
        { step: '03', title: 'Atraumatic Extraction', desc: 'Using specialized periotomes to loosen the tooth without bone trauma.' },
        { step: '04', title: 'Socket Cleansing & Hemostasis', desc: 'Debridement and pressure gauze placement for smooth clot formation.' },
      ]),
      benefits: JSON.stringify([
        'Instantly halts the spread of severe bacterial infection',
        'Eliminates intense, non-restorable tooth pain',
        'Preserves alveolar bone architecture for future implants',
      ]),
      recoveryInfo: 'Bite firmly on the gauze for 45 minutes. Avoid spitting, vigorous rinsing, or smoking for 24 hours.',
      faqs: JSON.stringify([
        { q: 'What happens after tooth extraction?', a: 'We discuss timely tooth replacement options like dental implants or fixed bridges to maintain bite balance and prevent shifting of adjacent teeth.' },
      ]),
      iconName: 'Scissors',
      imageUrl: 'https://images.unsplash.com/photo-1594824813628-482200234a91?auto=format&fit=crop&w=800&q=80',
      featured: false,
      sortOrder: 7,
    },
    {
      slug: 'pediatric-dentistry',
      name: 'Pediatric Dentistry',
      category: 'Pedodontics',
      summary: 'Gentle, child-friendly oral care, preventive sealants, fluoride treatments, and habit counseling for growing smiles.',
      description: 'Children require specialized dental approaches tailored to their emotional comfort and developing dental anatomy. Our pediatric dentistry focuses on gentle treatments, cavity prevention, pit & fissure sealants, and positive dental habits.',
      indications: JSON.stringify([
        'First dental checkup (recommended by 1st birthday)',
        'Early childhood caries / baby bottle tooth decay',
        'Thumb sucking or tongue thrusting habit counseling',
        'Preventive fluoride applications and pit & fissure sealants',
      ]),
      procedureSteps: JSON.stringify([
        { step: '01', title: 'Friendly Welcome & Acclimatization', desc: 'Introducing dental tools as fun gadgets to remove dental anxiety.' },
        { step: '02', title: 'Gentle Pediatric Examination', desc: 'Checking tooth eruption pattern, enamel quality, and bite alignment.' },
        { step: '03', title: 'Preventive Care / Treatment', desc: 'Application of fluoride varnish, painless sealants, or gentle fillings.' },
        { step: '04', title: 'Parental Guidance & Rewards', desc: 'Diet counseling, oral hygiene education, and positive reinforcement.' },
      ]),
      benefits: JSON.stringify([
        'Builds a lifelong fear-free attitude towards dental visits',
        'Protects primary teeth critical for speech and adult tooth spacing',
        'Detects and prevents dental decay before pain starts',
      ]),
      recoveryInfo: 'Children can immediately resume regular activities. Maintain positive encouragement at home.',
      faqs: JSON.stringify([
        { q: 'Why treat baby teeth if they will fall out anyway?', a: 'Baby teeth guide permanent adult teeth into proper alignment, aid in nutrition and speech development, and untreated infections can damage underlying adult tooth buds.' },
      ]),
      iconName: 'HeartHandshake',
      imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      featured: true,
      sortOrder: 8,
    },
    {
      slug: 'cosmetic-dentistry',
      name: 'Cosmetic Dentistry',
      category: 'Cosmetic Dentistry',
      summary: 'Smile makeovers, porcelain veneers, composite bonding, and aesthetic smile contouring.',
      description: 'Cosmetic dentistry combines medical science and aesthetic artistry to enhance smile symmetry, tooth shade, proportions, and gumline harmony.',
      indications: JSON.stringify([
        'Chipped, worn, or uneven teeth',
        'Persistent enamel discoloration resistant to bleaching',
        'Irregular tooth shapes or gaps between front teeth',
        'Desire for a comprehensive, customized smile makeover',
      ]),
      procedureSteps: JSON.stringify([
        { step: '01', title: 'Digital Smile Design', desc: 'Facial aesthetic analysis, mockups, and preview of proposed smile contour.' },
        { step: '02', title: 'Minimal Tooth Preparation', desc: 'Conservative micro-preparation ensuring maximum enamel retention.' },
        { step: '03', title: 'Custom Veneer / Bonding Fabrication', desc: 'Layering lifelike ceramic or high-grade composite materials.' },
        { step: '04', title: 'Aesthetic Bonding & Polish', desc: 'Permanent resin cementation and high-gloss multi-stage polishing.' },
      ]),
      benefits: JSON.stringify([
        'Dramatically enhances smile aesthetics and balance',
        'Natural optical translucency matching natural enamel',
        'Stain-resistant and biocompatible materials',
      ]),
      recoveryInfo: 'Immediate return to daily routine. Maintain good flossing and non-abrasive toothpaste use.',
      faqs: JSON.stringify([
        { q: 'What is the difference between veneers and bonding?', a: 'Composite bonding is applied directly in one session, while ceramic veneers are laboratory-crafted porcelain shells offering maximum durability and stain resistance.' },
      ]),
      iconName: 'Sparkles',
      imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
      featured: false,
      sortOrder: 9,
    },
    {
      slug: 'emergency-dental-care',
      name: 'Emergency Dental Care',
      category: 'Emergency Care',
      summary: 'Prompt support for acute tooth pain, dental trauma, knocked-out teeth, and facial swelling.',
      description: 'Dental emergencies require rapid clinical evaluation to relieve acute discomfort, manage trauma, and stabilize teeth. Roots Dental provides priority attention for urgent dental needs in Hanamkonda.',
      indications: JSON.stringify([
        'Acute, throbbing toothache that prevents sleeping or working',
        'Broken, fractured, or dislodged tooth due to an accident',
        'Sudden facial, lip, or gum swelling',
        'Bleeding from gums or mouth that does not stop',
      ]),
      procedureSteps: JSON.stringify([
        { step: '01', title: 'Triage & Immediate Examination', desc: 'Rapid assessment to locate the exact pain source or injury extent.' },
        { step: '02', title: 'Immediate Pain Relief', desc: 'Targeted local anesthesia or pain management medication.' },
        { step: '03', title: 'Emergency Stabilization', desc: 'Pulp capping, splinting loose teeth, or initiating first-stage drainage.' },
        { step: '04', title: 'Definitive Treatment Plan', desc: 'Structuring follow-up restorative care once acute phase is stabilized.' },
      ]),
      benefits: JSON.stringify([
        'Immediate relief from severe pain and distress',
        'Increases the chance of saving traumatized or avulsed teeth',
        'Prevents acute infection from spreading to deep fascial spaces',
      ]),
      recoveryInfo: 'Follow all prescribed medication schedules strictly. Keep the head elevated and avoid hot foods or exertion.',
      faqs: JSON.stringify([
        { q: 'What should I do if a permanent tooth gets knocked out?', a: 'Handle it only by the crown (never touch the root), rinse gently in milk or saline without scrubbing, place it back in the socket or in a cup of cold milk, and reach our clinic immediately within 60 minutes.' },
      ]),
      iconName: 'Flame',
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      featured: true,
      sortOrder: 10,
    },
  ];

  const createdTreatments = [];
  for (const t of treatmentsData) {
    const created = await prisma.treatment.create({ data: t });
    createdTreatments.push(created);
  }
  console.log(`✅ ${createdTreatments.length} Confirmed treatments seeded`);

  // 7. Verified Reviews (5.0 Google Rating, 66+ reviews reference)
  const reviewsData = [
    {
      author: 'Patient from Hanamkonda',
      rating: 5,
      comment: 'Very professional dental care! I visited Roots Dental for a root canal treatment. The doctor explained every step clearly and the entire process was smooth and painless. Highly recommended for anyone in Kazipet and Hanamkonda.',
      treatmentCategory: 'Root Canal Treatment',
      date: 'Recent Google Review',
      verified: true,
      source: 'Google',
      featured: true,
    },
    {
      author: 'Verified Patient',
      rating: 5,
      comment: 'Got cavity filling and cleaning done here. Extremely clean and hygienic clinic setup with modern equipment. The doctor was very patient and the price was very reasonable compared to other clinics.',
      treatmentCategory: 'Cavity Filling & Cleaning',
      date: 'Recent Google Review',
      verified: true,
      source: 'Google',
      featured: true,
    },
    {
      author: 'Local Resident',
      rating: 5,
      comment: 'I had severe wisdom tooth pain. The extraction was done with great precision and care. Recovery was very quick. The staff is polite and welcoming.',
      treatmentCategory: 'Wisdom Tooth Removal',
      date: 'Recent Google Review',
      verified: true,
      source: 'Google',
      featured: true,
    },
    {
      author: 'Family Dentistry Patient',
      rating: 5,
      comment: 'Best dental clinic near NIT Warangal area. Took my parents for dental consultation. Very honest doctor who only recommends necessary treatments. 5 stars for genuine care!',
      treatmentCategory: 'General Consultation',
      date: 'Recent Google Review',
      verified: true,
      source: 'Google',
      featured: true,
    },
    {
      author: 'Verified Visitor',
      rating: 5,
      comment: 'Super specialty clinic with excellent hygiene standards. Modern technology and clear pricing without hidden charges. Will definitely visit again for regular checkups.',
      treatmentCategory: 'Teeth Cleaning',
      date: 'Recent Google Review',
      verified: true,
      source: 'Google',
      featured: true,
    },
  ];

  for (const rev of reviewsData) {
    await prisma.review.create({ data: rev });
  }
  console.log(`✅ Verified reviews seeded`);

  // 8. FAQs
  const faqsData = [
    {
      question: 'What treatments does Roots Dental Clinic provide?',
      answer: 'Roots Super Speciality Dental Clinic provides comprehensive dental care including Root Canal Treatment, Dental Implants, Teeth Cleaning & Scaling, Teeth Whitening, Braces & Orthodontics, Wisdom Tooth Removal, Tooth Extractions, Pediatric Dentistry, Cosmetic Dentistry, and Emergency Dental Care.',
      category: 'General',
      sortOrder: 1,
    },
    {
      question: 'How do I book an appointment?',
      answer: 'You can book an appointment online via our 6-step appointment booking system on this website, chat with us directly on WhatsApp, or call our clinic phone number. We will confirm your preferred time slot promptly.',
      category: 'Booking',
      sortOrder: 2,
    },
    {
      question: 'How can I contact the clinic through WhatsApp?',
      answer: 'Simply click any of the "WhatsApp Us" buttons on our website. It will automatically open a pre-filled message on your WhatsApp with your treatment of interest, allowing you to ask questions or confirm your visit with our front desk.',
      category: 'Contact',
      sortOrder: 3,
    },
    {
      question: 'What should I bring for my first dental appointment?',
      answer: 'Please bring any previous dental records, recent X-rays (if available), and a list of current medications or relevant medical history. If you do not have previous records, our doctors will perform a fresh comprehensive digital assessment.',
      category: 'General',
      sortOrder: 4,
    },
    {
      question: 'How long does a typical dental consultation take?',
      answer: 'A standard initial consultation and examination typically takes 20 to 30 minutes, allowing our doctors to thoroughly inspect your teeth, discuss findings with you, and design a personalized treatment plan.',
      category: 'Consultation',
      sortOrder: 5,
    },
    {
      question: 'Do you treat children?',
      answer: 'Yes! We have specialized pediatric dental care tailored to children in a gentle, warm, and fear-free environment to make their visits pleasant and encouraging.',
      category: 'Pediatric',
      sortOrder: 6,
    },
    {
      question: 'Do you provide emergency dental care?',
      answer: 'Yes, we provide priority support for dental emergencies including acute toothache, knocked-out teeth, broken restorations, and facial swelling. Please call our clinic number or message us on WhatsApp immediately.',
      category: 'Emergency',
      sortOrder: 7,
    },
    {
      question: 'Do you offer root canal treatment?',
      answer: 'Yes, Root Canal Treatment is one of our primary specialities. We utilize modern rotary systems and digital apex locators for high precision, gentle treatment, and natural tooth preservation.',
      category: 'Treatments',
      sortOrder: 8,
    },
    {
      question: 'Do you provide dental implants?',
      answer: 'Yes, we offer modern dental implants made of biocompatible titanium to permanently replace single or multiple missing teeth with natural look and biting strength.',
      category: 'Treatments',
      sortOrder: 9,
    },
    {
      question: 'Do you provide braces and orthodontic treatment?',
      answer: 'Yes, we provide orthodontic solutions including traditional metal braces, ceramic aesthetic braces, and modern transparent clear aligners for both teens and adults.',
      category: 'Treatments',
      sortOrder: 10,
    },
  ];

  for (const faq of faqsData) {
    await prisma.fAQ.create({ data: faq });
  }
  console.log(`✅ FAQs seeded`);

  // 9. Gallery Items
  const galleryData = [
    {
      title: 'Modern Treatment Bay & Dental Operatory',
      category: 'CLINIC',
      imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
      caption: 'Ergonomic dental chair with intraoral imaging system and digital diagnostics.',
      sortOrder: 1,
    },
    {
      title: 'Digital Sterilization & Autoclave Suite',
      category: 'EQUIPMENT',
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      caption: 'Multi-stage medical-grade autoclaving and vacuum sterilization protocols.',
      sortOrder: 2,
    },
    {
      title: 'Advanced Rotary Endodontics & Apex Locators',
      category: 'EQUIPMENT',
      imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      caption: 'High-precision micro-rotary instruments for gentle root canal therapy.',
      sortOrder: 3,
    },
    {
      title: 'Comfortable Patient Reception & Lounge',
      category: 'PATIENT_EXPERIENCE',
      imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
      caption: 'Tranquil and hygienic reception lounge designed for patient comfort.',
      sortOrder: 4,
    },
  ];

  for (const g of galleryData) {
    await prisma.galleryItem.create({ data: g });
  }

  // 10. Sample Before/After records
  const beforeAfterData = [
    {
      title: 'Discolored Enamel to Radiant Smile',
      treatmentCategory: 'Teeth Whitening',
      beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
      afterImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
      description: 'Single-visit in-office whitening lifting 5 shades of deep extrinsic coffee stains with enamel nourishment.',
      consentVerified: true,
    },
    {
      title: 'Composite Aesthetic Restorative Alignment',
      treatmentCategory: 'Cosmetic Dentistry',
      beforeImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80',
      afterImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
      description: 'Cosmetic restoration of chipped incisor edge using lifelike composite layering.',
      consentVerified: true,
    },
  ];

  for (const ba of beforeAfterData) {
    await prisma.beforeAfter.create({ data: ba });
  }

  // 11. Initial Sample Appointments for Admin Dashboard demo
  const sampleAppointments = [
    {
      appointmentId: 'ROOTS-2026-9041',
      patientName: 'Kavitha Reddy',
      phone: '+91 94401 23456',
      email: 'kavitha.r@example.com',
      preferredContact: 'WHATSAPP',
      treatmentId: createdTreatments[0].id,
      doctorId: createdDoctors[0].id,
      appointmentDate: '2026-09-03',
      timeSlot: '10:30 AM',
      status: 'CONFIRMED',
      message: 'Experiencing tooth pain on the lower right molar since 3 days.',
      source: 'WEBSITE',
      notes: 'Confirmed via WhatsApp with patient.',
    },
    {
      appointmentId: 'ROOTS-2026-9042',
      patientName: 'Ramesh Kumar',
      phone: '+91 98480 12345',
      email: 'ramesh.k@example.com',
      preferredContact: 'CALL',
      treatmentId: createdTreatments[1].id,
      doctorId: createdDoctors[1].id,
      appointmentDate: '2026-09-03',
      timeSlot: '04:00 PM',
      status: 'PENDING',
      message: 'Consultation for missing lower premolar replacement.',
      source: 'WEBSITE',
    },
    {
      appointmentId: 'ROOTS-2026-9043',
      patientName: 'Sneha Patel',
      phone: '+91 97000 67890',
      email: 'sneha.p@example.com',
      preferredContact: 'WHATSAPP',
      treatmentId: createdTreatments[2].id,
      doctorId: createdDoctors[0].id,
      appointmentDate: '2026-09-04',
      timeSlot: '11:30 AM',
      status: 'PENDING',
      message: 'Routine teeth cleaning and dental checkup.',
      source: 'WHATSAPP',
    },
    {
      appointmentId: 'ROOTS-2026-9038',
      patientName: 'Vikram Sharma',
      phone: '+91 99887 76655',
      email: 'vikram.s@example.com',
      preferredContact: 'CALL',
      treatmentId: createdTreatments[4].id,
      doctorId: createdDoctors[2].id,
      appointmentDate: '2026-09-01',
      timeSlot: '05:30 PM',
      status: 'COMPLETED',
      message: 'Consultation for clear aligners.',
      source: 'WEBSITE',
      notes: 'Scans completed. Aligner set ordered.',
    },
  ];

  for (const appt of sampleAppointments) {
    await prisma.appointment.create({ data: appt });
  }

  console.log(`✅ Sample appointments created`);
  console.log(`🎉 Seeding completed successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

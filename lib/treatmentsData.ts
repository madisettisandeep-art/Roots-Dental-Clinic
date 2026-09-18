export interface TreatmentDetailData {
  id: string;
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  indications: string;
  procedureSteps: string;
  benefits: string;
  recoveryInfo: string;
  faqs: string;
  iconName: string;
  imageUrl?: string;
  videoId?: string;
}

export const FALLBACK_TREATMENTS: Record<string, TreatmentDetailData> = {
  'root-canal': {
    id: 'root-canal',
    slug: 'root-canal',
    name: 'Root Canal Treatment',
    category: 'Endodontics',
    summary:
      'Precision-focused treatment for infected or damaged teeth to relieve pain and preserve your natural tooth.',
    description:
      'Root Canal Treatment (RCT) is a precision procedure designed to eliminate bacteria from an infected root canal, prevent reinfection, and save the natural tooth. At Roots Dental Clinic, we utilize advanced rotary systems and digital apex locators for high precision and maximum patient comfort.',
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
    recoveryInfo:
      'Mild soreness for 24-48 hours is normal and easily managed with prescribed medication. Avoid chewing hard foods on the treated side until the permanent crown is placed.',
    faqs: JSON.stringify([
      { q: 'Is root canal treatment painful?', a: 'Modern root canal therapy at Roots Dental is performed under gentle local anesthesia and is comparable to getting a standard filling.' },
      { q: 'How many visits does RCT take?', a: 'Many root canals can be completed in a single visit, while teeth with active infection may require 2 structured appointments for complete sterilization.' },
      { q: 'Why is a crown necessary after root canal?', a: 'After a root canal, the tooth loses its blood supply and can become brittle over time. A custom dental crown protects it from fracture and restores full chewing function.' },
    ]),
    iconName: 'ShieldAlert',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    videoId: 'wZ1MtdkkZXg',
  },
  'dental-implants': {
    id: 'dental-implants',
    slug: 'dental-implants',
    name: 'Dental Implants',
    category: 'Implantology',
    summary:
      'Modern, permanent tooth-replacement solutions that look, feel, and function just like natural teeth.',
    description:
      'Dental implants are medical-grade titanium posts surgically placed into the jawbone to serve as artificial tooth roots. Once integrated with bone (osseointegration), they support lifelike crowns, bridges, or full arches with supreme strength and stability.',
    indications: JSON.stringify([
      'One or more missing natural teeth',
      'Difficulty chewing or biting with conventional dentures',
      'Desire for a permanent, non-removable solution',
      'Need to prevent jawbone deterioration following tooth loss',
    ]),
    procedureSteps: JSON.stringify([
      { step: '01', title: '3D CBCT Evaluation', desc: 'Digital volumetric imaging to measure bone density and map nerve canals.' },
      { step: '02', title: 'Computer-Guided Surgery', desc: 'Minimally invasive placement of titanium implant fixture.' },
      { step: '03', title: 'Osseointegration Period', desc: 'Natural biological fusing of bone tissue to titanium surface.' },
      { step: '04', title: 'Abutment Connection', desc: 'Connecting the precision custom titanium or zirconia connector.' },
      { step: '05', title: 'Crown Delivery', desc: 'Crafting and securing your lifelike permanent ceramic tooth.' },
    ]),
    benefits: JSON.stringify([
      'Permanent replacement lasting decades with good care',
      'Preserves adjacent natural teeth without filing',
      'Maintains facial bone structure and youthful contour',
      'Uncompromising chewing strength for any diet',
    ]),
    recoveryInfo:
      'Post-procedure discomfort is minimal. Soft diet is recommended for the first 3-5 days. Over-the-counter pain management is usually sufficient.',
    faqs: JSON.stringify([
      { q: 'Are dental implants painful?', a: 'The surgical procedure is performed under local anesthesia with minimal sensation. Most patients experience less discomfort than after a tooth extraction.' },
      { q: 'How long do dental implants last?', a: 'With proper oral hygiene and regular dental checkups, dental implants have a clinical success rate over 95% and can last a lifetime.' },
    ]),
    iconName: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
  },
};

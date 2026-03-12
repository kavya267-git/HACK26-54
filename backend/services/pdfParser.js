function detectSchemeType(text) {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('pm-kisan') || lowerText.includes('प्रधानमंत्री किसान')) {
    return 'PM-Kisan';
  } else if (lowerText.includes('ayushman') || lowerText.includes('आयुष्मान')) {
    return 'Ayushman Bharat';
  } else if (lowerText.includes('pm awas') || lowerText.includes('प्रधानमंत्री आवास')) {
    return 'PM Awas';
  } else if (lowerText.includes('mahila') || lowerText.includes('महिला')) {
    return 'Mahila Shakti';
  }
  
  return 'General Scheme';
}

function extractSchemeData(text, schemeType) {
  const data = {
    eligibility: [],
    benefits: [],
    documents: [],
    deadline: 'Not specified',
    helpline: 'Not specified',
    applyLink: '',
    summary: ''
  };

  // Extract eligibility criteria
  const eligibilityPatterns = [
    /eligibility[:\s]+([^.]+)/i,
    /पात्रता[:\s]+([^.]+)/i,
    /who can apply[:\s]+([^.]+)/i
  ];
  
  for (const pattern of eligibilityPatterns) {
    const match = text.match(pattern);
    if (match) {
      data.eligibility.push(match[1].trim());
    }
  }

  // Extract benefits
  const benefitsPatterns = [
    /benefits?[:\s]+([^.]+)/i,
    /लाभ[:\s]+([^.]+)/i,
    /features?[:\s]+([^.]+)/i
  ];

  for (const pattern of benefitsPatterns) {
    const match = text.match(pattern);
    if (match) {
      data.benefits.push(match[1].trim());
    }
  }

  // Extract documents required
  const documentsPatterns = [
    /documents? required[:\s]+([^.]+)/i,
    /आवश्यक दस्तावेज[:\s]+([^.]+)/i,
    /required documents?[:\s]+([^.]+)/i
  ];

  for (const pattern of documentsPatterns) {
    const match = text.match(pattern);
    if (match) {
      data.documents.push(match[1].trim());
    }
  }

  // Extract deadline
  const deadlineMatch = text.match(/(deadline|last date|अंतिम तिथि)[:\s]+([0-9]{1,2}\s*[\/-]\s*[0-9]{1,2}\s*[\/-]\s*[0-9]{2,4})/i);
  if (deadlineMatch) {
    data.deadline = deadlineMatch[2];
  }

  // Extract helpline
  const helplineMatch = text.match(/(helpline|सहायता|contact)[:\s]+([0-9]{10,12})/i);
  if (helplineMatch) {
    data.helpline = helplineMatch[2];
  }

  // Generate summary
  data.summary = `${schemeType}: ${data.benefits[0] || 'Government scheme'}`;

  return data;
}

module.exports = {
  detectSchemeType,
  extractSchemeData
};
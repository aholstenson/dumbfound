import { CharGenerator, CodepointRangeGenerator } from './generators';
import { Random } from '../random/random-source';

const MIN_SURROGATE = 0xD800;
const MAX_SURROGATE = 0xDFFF;
const SURROGATE_RANGE = MAX_SURROGATE - MIN_SURROGATE;

const MAX_CODEPOINT = 0x10FFFF;

const CODEPOINT_LENGTH = MAX_CODEPOINT - SURROGATE_RANGE;

export class UnicodeGenerator implements CharGenerator {
	public customProbability = false;

	get length() {
		return CODEPOINT_LENGTH;
	}

	public get(idx: number) {
		const codepoint = idx >= MIN_SURROGATE
			? idx + SURROGATE_RANGE
			: idx;

		return String.fromCodePoint(codepoint);
	}

	public pick(random: Random) {
		const idx = random.intBetween(0, this.length - 1);
		return this.get(idx);
	}
}

export const allOfUnicode = new UnicodeGenerator();

/*
 * Named blocks from the Unicode standard.
 *
 * Generated via unicode-block-generator.js
 */
/** Unicode Block: Basic Latin */
export const unicodeBasicLatin = new CodepointRangeGenerator(0x0000, 0x007F);
/** Unicode Block: Latin-1 Supplement */
export const unicodeLatin1Supplement = new CodepointRangeGenerator(0x0080, 0x00FF);
/** Unicode Block: Latin Extended-A */
export const unicodeLatinExtendedA = new CodepointRangeGenerator(0x0100, 0x017F);
/** Unicode Block: Latin Extended-B */
export const unicodeLatinExtendedB = new CodepointRangeGenerator(0x0180, 0x024F);
/** Unicode Block: IPA Extensions */
export const unicodeIPAExtensions = new CodepointRangeGenerator(0x0250, 0x02AF);
/** Unicode Block: Spacing Modifier Letters */
export const unicodeSpacingModifierLetters = new CodepointRangeGenerator(0x02B0, 0x02FF);
/** Unicode Block: Combining Diacritical Marks */
export const unicodeCombiningDiacriticalMarks = new CodepointRangeGenerator(0x0300, 0x036F);
/** Unicode Block: Greek and Coptic */
export const unicodeGreekAndCoptic = new CodepointRangeGenerator(0x0370, 0x03FF);
/** Unicode Block: Cyrillic */
export const unicodeCyrillic = new CodepointRangeGenerator(0x0400, 0x04FF);
/** Unicode Block: Cyrillic Supplement */
export const unicodeCyrillicSupplement = new CodepointRangeGenerator(0x0500, 0x052F);
/** Unicode Block: Armenian */
export const unicodeArmenian = new CodepointRangeGenerator(0x0530, 0x058F);
/** Unicode Block: Hebrew */
export const unicodeHebrew = new CodepointRangeGenerator(0x0590, 0x05FF);
/** Unicode Block: Arabic */
export const unicodeArabic = new CodepointRangeGenerator(0x0600, 0x06FF);
/** Unicode Block: Syriac */
export const unicodeSyriac = new CodepointRangeGenerator(0x0700, 0x074F);
/** Unicode Block: Arabic Supplement */
export const unicodeArabicSupplement = new CodepointRangeGenerator(0x0750, 0x077F);
/** Unicode Block: Thaana */
export const unicodeThaana = new CodepointRangeGenerator(0x0780, 0x07BF);
/** Unicode Block: NKo */
export const unicodeNKo = new CodepointRangeGenerator(0x07C0, 0x07FF);
/** Unicode Block: Samaritan */
export const unicodeSamaritan = new CodepointRangeGenerator(0x0800, 0x083F);
/** Unicode Block: Mandaic */
export const unicodeMandaic = new CodepointRangeGenerator(0x0840, 0x085F);
/** Unicode Block: Syriac Supplement */
export const unicodeSyriacSupplement = new CodepointRangeGenerator(0x0860, 0x086F);
/** Unicode Block: Arabic Extended-A */
export const unicodeArabicExtendedA = new CodepointRangeGenerator(0x08A0, 0x08FF);
/** Unicode Block: Devanagari */
export const unicodeDevanagari = new CodepointRangeGenerator(0x0900, 0x097F);
/** Unicode Block: Bengali */
export const unicodeBengali = new CodepointRangeGenerator(0x0980, 0x09FF);
/** Unicode Block: Gurmukhi */
export const unicodeGurmukhi = new CodepointRangeGenerator(0x0A00, 0x0A7F);
/** Unicode Block: Gujarati */
export const unicodeGujarati = new CodepointRangeGenerator(0x0A80, 0x0AFF);
/** Unicode Block: Oriya */
export const unicodeOriya = new CodepointRangeGenerator(0x0B00, 0x0B7F);
/** Unicode Block: Tamil */
export const unicodeTamil = new CodepointRangeGenerator(0x0B80, 0x0BFF);
/** Unicode Block: Telugu */
export const unicodeTelugu = new CodepointRangeGenerator(0x0C00, 0x0C7F);
/** Unicode Block: Kannada */
export const unicodeKannada = new CodepointRangeGenerator(0x0C80, 0x0CFF);
/** Unicode Block: Malayalam */
export const unicodeMalayalam = new CodepointRangeGenerator(0x0D00, 0x0D7F);
/** Unicode Block: Sinhala */
export const unicodeSinhala = new CodepointRangeGenerator(0x0D80, 0x0DFF);
/** Unicode Block: Thai */
export const unicodeThai = new CodepointRangeGenerator(0x0E00, 0x0E7F);
/** Unicode Block: Lao */
export const unicodeLao = new CodepointRangeGenerator(0x0E80, 0x0EFF);
/** Unicode Block: Tibetan */
export const unicodeTibetan = new CodepointRangeGenerator(0x0F00, 0x0FFF);
/** Unicode Block: Myanmar */
export const unicodeMyanmar = new CodepointRangeGenerator(0x1000, 0x109F);
/** Unicode Block: Georgian */
export const unicodeGeorgian = new CodepointRangeGenerator(0x10A0, 0x10FF);
/** Unicode Block: Hangul Jamo */
export const unicodeHangulJamo = new CodepointRangeGenerator(0x1100, 0x11FF);
/** Unicode Block: Ethiopic */
export const unicodeEthiopic = new CodepointRangeGenerator(0x1200, 0x137F);
/** Unicode Block: Ethiopic Supplement */
export const unicodeEthiopicSupplement = new CodepointRangeGenerator(0x1380, 0x139F);
/** Unicode Block: Cherokee */
export const unicodeCherokee = new CodepointRangeGenerator(0x13A0, 0x13FF);
/** Unicode Block: Unified Canadian Aboriginal Syllabics */
export const unicodeUnifiedCanadianAboriginalSyllabics = new CodepointRangeGenerator(0x1400, 0x167F);
/** Unicode Block: Ogham */
export const unicodeOgham = new CodepointRangeGenerator(0x1680, 0x169F);
/** Unicode Block: Runic */
export const unicodeRunic = new CodepointRangeGenerator(0x16A0, 0x16FF);
/** Unicode Block: Tagalog */
export const unicodeTagalog = new CodepointRangeGenerator(0x1700, 0x171F);
/** Unicode Block: Hanunoo */
export const unicodeHanunoo = new CodepointRangeGenerator(0x1720, 0x173F);
/** Unicode Block: Buhid */
export const unicodeBuhid = new CodepointRangeGenerator(0x1740, 0x175F);
/** Unicode Block: Tagbanwa */
export const unicodeTagbanwa = new CodepointRangeGenerator(0x1760, 0x177F);
/** Unicode Block: Khmer */
export const unicodeKhmer = new CodepointRangeGenerator(0x1780, 0x17FF);
/** Unicode Block: Mongolian */
export const unicodeMongolian = new CodepointRangeGenerator(0x1800, 0x18AF);
/** Unicode Block: Unified Canadian Aboriginal Syllabics Extended */
export const unicodeUnifiedCanadianAboriginalSyllabicsExtended = new CodepointRangeGenerator(0x18B0, 0x18FF);
/** Unicode Block: Limbu */
export const unicodeLimbu = new CodepointRangeGenerator(0x1900, 0x194F);
/** Unicode Block: Tai Le */
export const unicodeTaiLe = new CodepointRangeGenerator(0x1950, 0x197F);
/** Unicode Block: New Tai Lue */
export const unicodeNewTaiLue = new CodepointRangeGenerator(0x1980, 0x19DF);
/** Unicode Block: Khmer Symbols */
export const unicodeKhmerSymbols = new CodepointRangeGenerator(0x19E0, 0x19FF);
/** Unicode Block: Buginese */
export const unicodeBuginese = new CodepointRangeGenerator(0x1A00, 0x1A1F);
/** Unicode Block: Tai Tham */
export const unicodeTaiTham = new CodepointRangeGenerator(0x1A20, 0x1AAF);
/** Unicode Block: Combining Diacritical Marks Extended */
export const unicodeCombiningDiacriticalMarksExtended = new CodepointRangeGenerator(0x1AB0, 0x1AFF);
/** Unicode Block: Balinese */
export const unicodeBalinese = new CodepointRangeGenerator(0x1B00, 0x1B7F);
/** Unicode Block: Sundanese */
export const unicodeSundanese = new CodepointRangeGenerator(0x1B80, 0x1BBF);
/** Unicode Block: Batak */
export const unicodeBatak = new CodepointRangeGenerator(0x1BC0, 0x1BFF);
/** Unicode Block: Lepcha */
export const unicodeLepcha = new CodepointRangeGenerator(0x1C00, 0x1C4F);
/** Unicode Block: Ol Chiki */
export const unicodeOlChiki = new CodepointRangeGenerator(0x1C50, 0x1C7F);
/** Unicode Block: Cyrillic Extended-C */
export const unicodeCyrillicExtendedC = new CodepointRangeGenerator(0x1C80, 0x1C8F);
/** Unicode Block: Sundanese Supplement */
export const unicodeSundaneseSupplement = new CodepointRangeGenerator(0x1CC0, 0x1CCF);
/** Unicode Block: Vedic Extensions */
export const unicodeVedicExtensions = new CodepointRangeGenerator(0x1CD0, 0x1CFF);
/** Unicode Block: Phonetic Extensions */
export const unicodePhoneticExtensions = new CodepointRangeGenerator(0x1D00, 0x1D7F);
/** Unicode Block: Phonetic Extensions Supplement */
export const unicodePhoneticExtensionsSupplement = new CodepointRangeGenerator(0x1D80, 0x1DBF);
/** Unicode Block: Combining Diacritical Marks Supplement */
export const unicodeCombiningDiacriticalMarksSupplement = new CodepointRangeGenerator(0x1DC0, 0x1DFF);
/** Unicode Block: Latin Extended Additional */
export const unicodeLatinExtendedAdditional = new CodepointRangeGenerator(0x1E00, 0x1EFF);
/** Unicode Block: Greek Extended */
export const unicodeGreekExtended = new CodepointRangeGenerator(0x1F00, 0x1FFF);
/** Unicode Block: General Punctuation */
export const unicodeGeneralPunctuation = new CodepointRangeGenerator(0x2000, 0x206F);
/** Unicode Block: Superscripts and Subscripts */
export const unicodeSuperscriptsAndSubscripts = new CodepointRangeGenerator(0x2070, 0x209F);
/** Unicode Block: Currency Symbols */
export const unicodeCurrencySymbols = new CodepointRangeGenerator(0x20A0, 0x20CF);
/** Unicode Block: Combining Diacritical Marks for Symbols */
export const unicodeCombiningDiacriticalMarksForSymbols = new CodepointRangeGenerator(0x20D0, 0x20FF);
/** Unicode Block: Letterlike Symbols */
export const unicodeLetterlikeSymbols = new CodepointRangeGenerator(0x2100, 0x214F);
/** Unicode Block: Number Forms */
export const unicodeNumberForms = new CodepointRangeGenerator(0x2150, 0x218F);
/** Unicode Block: Arrows */
export const unicodeArrows = new CodepointRangeGenerator(0x2190, 0x21FF);
/** Unicode Block: Mathematical Operators */
export const unicodeMathematicalOperators = new CodepointRangeGenerator(0x2200, 0x22FF);
/** Unicode Block: Miscellaneous Technical */
export const unicodeMiscellaneousTechnical = new CodepointRangeGenerator(0x2300, 0x23FF);
/** Unicode Block: Control Pictures */
export const unicodeControlPictures = new CodepointRangeGenerator(0x2400, 0x243F);
/** Unicode Block: Optical Character Recognition */
export const unicodeOpticalCharacterRecognition = new CodepointRangeGenerator(0x2440, 0x245F);
/** Unicode Block: Enclosed Alphanumerics */
export const unicodeEnclosedAlphanumerics = new CodepointRangeGenerator(0x2460, 0x24FF);
/** Unicode Block: Box Drawing */
export const unicodeBoxDrawing = new CodepointRangeGenerator(0x2500, 0x257F);
/** Unicode Block: Block Elements */
export const unicodeBlockElements = new CodepointRangeGenerator(0x2580, 0x259F);
/** Unicode Block: Geometric Shapes */
export const unicodeGeometricShapes = new CodepointRangeGenerator(0x25A0, 0x25FF);
/** Unicode Block: Miscellaneous Symbols */
export const unicodeMiscellaneousSymbols = new CodepointRangeGenerator(0x2600, 0x26FF);
/** Unicode Block: Dingbats */
export const unicodeDingbats = new CodepointRangeGenerator(0x2700, 0x27BF);
/** Unicode Block: Miscellaneous Mathematical Symbols-A */
export const unicodeMiscellaneousMathematicalSymbolsA = new CodepointRangeGenerator(0x27C0, 0x27EF);
/** Unicode Block: Supplemental Arrows-A */
export const unicodeSupplementalArrowsA = new CodepointRangeGenerator(0x27F0, 0x27FF);
/** Unicode Block: Braille Patterns */
export const unicodeBraillePatterns = new CodepointRangeGenerator(0x2800, 0x28FF);
/** Unicode Block: Supplemental Arrows-B */
export const unicodeSupplementalArrowsB = new CodepointRangeGenerator(0x2900, 0x297F);
/** Unicode Block: Miscellaneous Mathematical Symbols-B */
export const unicodeMiscellaneousMathematicalSymbolsB = new CodepointRangeGenerator(0x2980, 0x29FF);
/** Unicode Block: Supplemental Mathematical Operators */
export const unicodeSupplementalMathematicalOperators = new CodepointRangeGenerator(0x2A00, 0x2AFF);
/** Unicode Block: Miscellaneous Symbols and Arrows */
export const unicodeMiscellaneousSymbolsAndArrows = new CodepointRangeGenerator(0x2B00, 0x2BFF);
/** Unicode Block: Glagolitic */
export const unicodeGlagolitic = new CodepointRangeGenerator(0x2C00, 0x2C5F);
/** Unicode Block: Latin Extended-C */
export const unicodeLatinExtendedC = new CodepointRangeGenerator(0x2C60, 0x2C7F);
/** Unicode Block: Coptic */
export const unicodeCoptic = new CodepointRangeGenerator(0x2C80, 0x2CFF);
/** Unicode Block: Georgian Supplement */
export const unicodeGeorgianSupplement = new CodepointRangeGenerator(0x2D00, 0x2D2F);
/** Unicode Block: Tifinagh */
export const unicodeTifinagh = new CodepointRangeGenerator(0x2D30, 0x2D7F);
/** Unicode Block: Ethiopic Extended */
export const unicodeEthiopicExtended = new CodepointRangeGenerator(0x2D80, 0x2DDF);
/** Unicode Block: Cyrillic Extended-A */
export const unicodeCyrillicExtendedA = new CodepointRangeGenerator(0x2DE0, 0x2DFF);
/** Unicode Block: Supplemental Punctuation */
export const unicodeSupplementalPunctuation = new CodepointRangeGenerator(0x2E00, 0x2E7F);
/** Unicode Block: CJK Radicals Supplement */
export const unicodeCJKRadicalsSupplement = new CodepointRangeGenerator(0x2E80, 0x2EFF);
/** Unicode Block: Kangxi Radicals */
export const unicodeKangxiRadicals = new CodepointRangeGenerator(0x2F00, 0x2FDF);
/** Unicode Block: Ideographic Description Characters */
export const unicodeIdeographicDescriptionCharacters = new CodepointRangeGenerator(0x2FF0, 0x2FFF);
/** Unicode Block: CJK Symbols and Punctuation */
export const unicodeCJKSymbolsAndPunctuation = new CodepointRangeGenerator(0x3000, 0x303F);
/** Unicode Block: Hiragana */
export const unicodeHiragana = new CodepointRangeGenerator(0x3040, 0x309F);
/** Unicode Block: Katakana */
export const unicodeKatakana = new CodepointRangeGenerator(0x30A0, 0x30FF);
/** Unicode Block: Bopomofo */
export const unicodeBopomofo = new CodepointRangeGenerator(0x3100, 0x312F);
/** Unicode Block: Hangul Compatibility Jamo */
export const unicodeHangulCompatibilityJamo = new CodepointRangeGenerator(0x3130, 0x318F);
/** Unicode Block: Kanbun */
export const unicodeKanbun = new CodepointRangeGenerator(0x3190, 0x319F);
/** Unicode Block: Bopomofo Extended */
export const unicodeBopomofoExtended = new CodepointRangeGenerator(0x31A0, 0x31BF);
/** Unicode Block: CJK Strokes */
export const unicodeCJKStrokes = new CodepointRangeGenerator(0x31C0, 0x31EF);
/** Unicode Block: Katakana Phonetic Extensions */
export const unicodeKatakanaPhoneticExtensions = new CodepointRangeGenerator(0x31F0, 0x31FF);
/** Unicode Block: Enclosed CJK Letters and Months */
export const unicodeEnclosedCJKLettersAndMonths = new CodepointRangeGenerator(0x3200, 0x32FF);
/** Unicode Block: CJK Compatibility */
export const unicodeCJKCompatibility = new CodepointRangeGenerator(0x3300, 0x33FF);
/** Unicode Block: CJK Unified Ideographs Extension A */
export const unicodeCJKUnifiedIdeographsExtensionA = new CodepointRangeGenerator(0x3400, 0x4DBF);
/** Unicode Block: Yijing Hexagram Symbols */
export const unicodeYijingHexagramSymbols = new CodepointRangeGenerator(0x4DC0, 0x4DFF);
/** Unicode Block: CJK Unified Ideographs */
export const unicodeCJKUnifiedIdeographs = new CodepointRangeGenerator(0x4E00, 0x9FFF);
/** Unicode Block: Yi Syllables */
export const unicodeYiSyllables = new CodepointRangeGenerator(0xA000, 0xA48F);
/** Unicode Block: Yi Radicals */
export const unicodeYiRadicals = new CodepointRangeGenerator(0xA490, 0xA4CF);
/** Unicode Block: Lisu */
export const unicodeLisu = new CodepointRangeGenerator(0xA4D0, 0xA4FF);
/** Unicode Block: Vai */
export const unicodeVai = new CodepointRangeGenerator(0xA500, 0xA63F);
/** Unicode Block: Cyrillic Extended-B */
export const unicodeCyrillicExtendedB = new CodepointRangeGenerator(0xA640, 0xA69F);
/** Unicode Block: Bamum */
export const unicodeBamum = new CodepointRangeGenerator(0xA6A0, 0xA6FF);
/** Unicode Block: Modifier Tone Letters */
export const unicodeModifierToneLetters = new CodepointRangeGenerator(0xA700, 0xA71F);
/** Unicode Block: Latin Extended-D */
export const unicodeLatinExtendedD = new CodepointRangeGenerator(0xA720, 0xA7FF);
/** Unicode Block: Syloti Nagri */
export const unicodeSylotiNagri = new CodepointRangeGenerator(0xA800, 0xA82F);
/** Unicode Block: Common Indic Number Forms */
export const unicodeCommonIndicNumberForms = new CodepointRangeGenerator(0xA830, 0xA83F);
/** Unicode Block: Phags-pa */
export const unicodePhagspa = new CodepointRangeGenerator(0xA840, 0xA87F);
/** Unicode Block: Saurashtra */
export const unicodeSaurashtra = new CodepointRangeGenerator(0xA880, 0xA8DF);
/** Unicode Block: Devanagari Extended */
export const unicodeDevanagariExtended = new CodepointRangeGenerator(0xA8E0, 0xA8FF);
/** Unicode Block: Kayah Li */
export const unicodeKayahLi = new CodepointRangeGenerator(0xA900, 0xA92F);
/** Unicode Block: Rejang */
export const unicodeRejang = new CodepointRangeGenerator(0xA930, 0xA95F);
/** Unicode Block: Hangul Jamo Extended-A */
export const unicodeHangulJamoExtendedA = new CodepointRangeGenerator(0xA960, 0xA97F);
/** Unicode Block: Javanese */
export const unicodeJavanese = new CodepointRangeGenerator(0xA980, 0xA9DF);
/** Unicode Block: Myanmar Extended-B */
export const unicodeMyanmarExtendedB = new CodepointRangeGenerator(0xA9E0, 0xA9FF);
/** Unicode Block: Cham */
export const unicodeCham = new CodepointRangeGenerator(0xAA00, 0xAA5F);
/** Unicode Block: Myanmar Extended-A */
export const unicodeMyanmarExtendedA = new CodepointRangeGenerator(0xAA60, 0xAA7F);
/** Unicode Block: Tai Viet */
export const unicodeTaiViet = new CodepointRangeGenerator(0xAA80, 0xAADF);
/** Unicode Block: Meetei Mayek Extensions */
export const unicodeMeeteiMayekExtensions = new CodepointRangeGenerator(0xAAE0, 0xAAFF);
/** Unicode Block: Ethiopic Extended-A */
export const unicodeEthiopicExtendedA = new CodepointRangeGenerator(0xAB00, 0xAB2F);
/** Unicode Block: Latin Extended-E */
export const unicodeLatinExtendedE = new CodepointRangeGenerator(0xAB30, 0xAB6F);
/** Unicode Block: Cherokee Supplement */
export const unicodeCherokeeSupplement = new CodepointRangeGenerator(0xAB70, 0xABBF);
/** Unicode Block: Meetei Mayek */
export const unicodeMeeteiMayek = new CodepointRangeGenerator(0xABC0, 0xABFF);
/** Unicode Block: Hangul Syllables */
export const unicodeHangulSyllables = new CodepointRangeGenerator(0xAC00, 0xD7AF);
/** Unicode Block: Hangul Jamo Extended-B */
export const unicodeHangulJamoExtendedB = new CodepointRangeGenerator(0xD7B0, 0xD7FF);
/** Unicode Block: High Surrogates */
export const unicodeHighSurrogates = new CodepointRangeGenerator(0xD800, 0xDB7F);
/** Unicode Block: High Private Use Surrogates */
export const unicodeHighPrivateUseSurrogates = new CodepointRangeGenerator(0xDB80, 0xDBFF);
/** Unicode Block: Low Surrogates */
export const unicodeLowSurrogates = new CodepointRangeGenerator(0xDC00, 0xDFFF);
/** Unicode Block: Private Use Area */
export const unicodePrivateUseArea = new CodepointRangeGenerator(0xE000, 0xF8FF);
/** Unicode Block: CJK Compatibility Ideographs */
export const unicodeCJKCompatibilityIdeographs = new CodepointRangeGenerator(0xF900, 0xFAFF);
/** Unicode Block: Alphabetic Presentation Forms */
export const unicodeAlphabeticPresentationForms = new CodepointRangeGenerator(0xFB00, 0xFB4F);
/** Unicode Block: Arabic Presentation Forms-A */
export const unicodeArabicPresentationFormsA = new CodepointRangeGenerator(0xFB50, 0xFDFF);
/** Unicode Block: Variation Selectors */
export const unicodeVariationSelectors = new CodepointRangeGenerator(0xFE00, 0xFE0F);
/** Unicode Block: Vertical Forms */
export const unicodeVerticalForms = new CodepointRangeGenerator(0xFE10, 0xFE1F);
/** Unicode Block: Combining Half Marks */
export const unicodeCombiningHalfMarks = new CodepointRangeGenerator(0xFE20, 0xFE2F);
/** Unicode Block: CJK Compatibility Forms */
export const unicodeCJKCompatibilityForms = new CodepointRangeGenerator(0xFE30, 0xFE4F);
/** Unicode Block: Small Form Variants */
export const unicodeSmallFormVariants = new CodepointRangeGenerator(0xFE50, 0xFE6F);
/** Unicode Block: Arabic Presentation Forms-B */
export const unicodeArabicPresentationFormsB = new CodepointRangeGenerator(0xFE70, 0xFEFF);
/** Unicode Block: Halfwidth and Fullwidth Forms */
export const unicodeHalfwidthAndFullwidthForms = new CodepointRangeGenerator(0xFF00, 0xFFEF);
/** Unicode Block: Specials */
export const unicodeSpecials = new CodepointRangeGenerator(0xFFF0, 0xFFFF);
/** Unicode Block: Linear B Syllabary */
export const unicodeLinearBSyllabary = new CodepointRangeGenerator(0x10000, 0x1007F);
/** Unicode Block: Linear B Ideograms */
export const unicodeLinearBIdeograms = new CodepointRangeGenerator(0x10080, 0x100FF);
/** Unicode Block: Aegean Numbers */
export const unicodeAegeanNumbers = new CodepointRangeGenerator(0x10100, 0x1013F);
/** Unicode Block: Ancient Greek Numbers */
export const unicodeAncientGreekNumbers = new CodepointRangeGenerator(0x10140, 0x1018F);
/** Unicode Block: Ancient Symbols */
export const unicodeAncientSymbols = new CodepointRangeGenerator(0x10190, 0x101CF);
/** Unicode Block: Phaistos Disc */
export const unicodePhaistosDisc = new CodepointRangeGenerator(0x101D0, 0x101FF);
/** Unicode Block: Lycian */
export const unicodeLycian = new CodepointRangeGenerator(0x10280, 0x1029F);
/** Unicode Block: Carian */
export const unicodeCarian = new CodepointRangeGenerator(0x102A0, 0x102DF);
/** Unicode Block: Coptic Epact Numbers */
export const unicodeCopticEpactNumbers = new CodepointRangeGenerator(0x102E0, 0x102FF);
/** Unicode Block: Old Italic */
export const unicodeOldItalic = new CodepointRangeGenerator(0x10300, 0x1032F);
/** Unicode Block: Gothic */
export const unicodeGothic = new CodepointRangeGenerator(0x10330, 0x1034F);
/** Unicode Block: Old Permic */
export const unicodeOldPermic = new CodepointRangeGenerator(0x10350, 0x1037F);
/** Unicode Block: Ugaritic */
export const unicodeUgaritic = new CodepointRangeGenerator(0x10380, 0x1039F);
/** Unicode Block: Old Persian */
export const unicodeOldPersian = new CodepointRangeGenerator(0x103A0, 0x103DF);
/** Unicode Block: Deseret */
export const unicodeDeseret = new CodepointRangeGenerator(0x10400, 0x1044F);
/** Unicode Block: Shavian */
export const unicodeShavian = new CodepointRangeGenerator(0x10450, 0x1047F);
/** Unicode Block: Osmanya */
export const unicodeOsmanya = new CodepointRangeGenerator(0x10480, 0x104AF);
/** Unicode Block: Osage */
export const unicodeOsage = new CodepointRangeGenerator(0x104B0, 0x104FF);
/** Unicode Block: Elbasan */
export const unicodeElbasan = new CodepointRangeGenerator(0x10500, 0x1052F);
/** Unicode Block: Caucasian Albanian */
export const unicodeCaucasianAlbanian = new CodepointRangeGenerator(0x10530, 0x1056F);
/** Unicode Block: Linear A */
export const unicodeLinearA = new CodepointRangeGenerator(0x10600, 0x1077F);
/** Unicode Block: Cypriot Syllabary */
export const unicodeCypriotSyllabary = new CodepointRangeGenerator(0x10800, 0x1083F);
/** Unicode Block: Imperial Aramaic */
export const unicodeImperialAramaic = new CodepointRangeGenerator(0x10840, 0x1085F);
/** Unicode Block: Palmyrene */
export const unicodePalmyrene = new CodepointRangeGenerator(0x10860, 0x1087F);
/** Unicode Block: Nabataean */
export const unicodeNabataean = new CodepointRangeGenerator(0x10880, 0x108AF);
/** Unicode Block: Hatran */
export const unicodeHatran = new CodepointRangeGenerator(0x108E0, 0x108FF);
/** Unicode Block: Phoenician */
export const unicodePhoenician = new CodepointRangeGenerator(0x10900, 0x1091F);
/** Unicode Block: Lydian */
export const unicodeLydian = new CodepointRangeGenerator(0x10920, 0x1093F);
/** Unicode Block: Meroitic Hieroglyphs */
export const unicodeMeroiticHieroglyphs = new CodepointRangeGenerator(0x10980, 0x1099F);
/** Unicode Block: Meroitic Cursive */
export const unicodeMeroiticCursive = new CodepointRangeGenerator(0x109A0, 0x109FF);
/** Unicode Block: Kharoshthi */
export const unicodeKharoshthi = new CodepointRangeGenerator(0x10A00, 0x10A5F);
/** Unicode Block: Old South Arabian */
export const unicodeOldSouthArabian = new CodepointRangeGenerator(0x10A60, 0x10A7F);
/** Unicode Block: Old North Arabian */
export const unicodeOldNorthArabian = new CodepointRangeGenerator(0x10A80, 0x10A9F);
/** Unicode Block: Manichaean */
export const unicodeManichaean = new CodepointRangeGenerator(0x10AC0, 0x10AFF);
/** Unicode Block: Avestan */
export const unicodeAvestan = new CodepointRangeGenerator(0x10B00, 0x10B3F);
/** Unicode Block: Inscriptional Parthian */
export const unicodeInscriptionalParthian = new CodepointRangeGenerator(0x10B40, 0x10B5F);
/** Unicode Block: Inscriptional Pahlavi */
export const unicodeInscriptionalPahlavi = new CodepointRangeGenerator(0x10B60, 0x10B7F);
/** Unicode Block: Psalter Pahlavi */
export const unicodePsalterPahlavi = new CodepointRangeGenerator(0x10B80, 0x10BAF);
/** Unicode Block: Old Turkic */
export const unicodeOldTurkic = new CodepointRangeGenerator(0x10C00, 0x10C4F);
/** Unicode Block: Old Hungarian */
export const unicodeOldHungarian = new CodepointRangeGenerator(0x10C80, 0x10CFF);
/** Unicode Block: Rumi Numeral Symbols */
export const unicodeRumiNumeralSymbols = new CodepointRangeGenerator(0x10E60, 0x10E7F);
/** Unicode Block: Brahmi */
export const unicodeBrahmi = new CodepointRangeGenerator(0x11000, 0x1107F);
/** Unicode Block: Kaithi */
export const unicodeKaithi = new CodepointRangeGenerator(0x11080, 0x110CF);
/** Unicode Block: Sora Sompeng */
export const unicodeSoraSompeng = new CodepointRangeGenerator(0x110D0, 0x110FF);
/** Unicode Block: Chakma */
export const unicodeChakma = new CodepointRangeGenerator(0x11100, 0x1114F);
/** Unicode Block: Mahajani */
export const unicodeMahajani = new CodepointRangeGenerator(0x11150, 0x1117F);
/** Unicode Block: Sharada */
export const unicodeSharada = new CodepointRangeGenerator(0x11180, 0x111DF);
/** Unicode Block: Sinhala Archaic Numbers */
export const unicodeSinhalaArchaicNumbers = new CodepointRangeGenerator(0x111E0, 0x111FF);
/** Unicode Block: Khojki */
export const unicodeKhojki = new CodepointRangeGenerator(0x11200, 0x1124F);
/** Unicode Block: Multani */
export const unicodeMultani = new CodepointRangeGenerator(0x11280, 0x112AF);
/** Unicode Block: Khudawadi */
export const unicodeKhudawadi = new CodepointRangeGenerator(0x112B0, 0x112FF);
/** Unicode Block: Grantha */
export const unicodeGrantha = new CodepointRangeGenerator(0x11300, 0x1137F);
/** Unicode Block: Newa */
export const unicodeNewa = new CodepointRangeGenerator(0x11400, 0x1147F);
/** Unicode Block: Tirhuta */
export const unicodeTirhuta = new CodepointRangeGenerator(0x11480, 0x114DF);
/** Unicode Block: Siddham */
export const unicodeSiddham = new CodepointRangeGenerator(0x11580, 0x115FF);
/** Unicode Block: Modi */
export const unicodeModi = new CodepointRangeGenerator(0x11600, 0x1165F);
/** Unicode Block: Mongolian Supplement */
export const unicodeMongolianSupplement = new CodepointRangeGenerator(0x11660, 0x1167F);
/** Unicode Block: Takri */
export const unicodeTakri = new CodepointRangeGenerator(0x11680, 0x116CF);
/** Unicode Block: Ahom */
export const unicodeAhom = new CodepointRangeGenerator(0x11700, 0x1173F);
/** Unicode Block: Warang Citi */
export const unicodeWarangCiti = new CodepointRangeGenerator(0x118A0, 0x118FF);
/** Unicode Block: Zanabazar Square */
export const unicodeZanabazarSquare = new CodepointRangeGenerator(0x11A00, 0x11A4F);
/** Unicode Block: Soyombo */
export const unicodeSoyombo = new CodepointRangeGenerator(0x11A50, 0x11AAF);
/** Unicode Block: Pau Cin Hau */
export const unicodePauCinHau = new CodepointRangeGenerator(0x11AC0, 0x11AFF);
/** Unicode Block: Bhaiksuki */
export const unicodeBhaiksuki = new CodepointRangeGenerator(0x11C00, 0x11C6F);
/** Unicode Block: Marchen */
export const unicodeMarchen = new CodepointRangeGenerator(0x11C70, 0x11CBF);
/** Unicode Block: Masaram Gondi */
export const unicodeMasaramGondi = new CodepointRangeGenerator(0x11D00, 0x11D5F);
/** Unicode Block: Cuneiform */
export const unicodeCuneiform = new CodepointRangeGenerator(0x12000, 0x123FF);
/** Unicode Block: Cuneiform Numbers and Punctuation */
export const unicodeCuneiformNumbersAndPunctuation = new CodepointRangeGenerator(0x12400, 0x1247F);
/** Unicode Block: Early Dynastic Cuneiform */
export const unicodeEarlyDynasticCuneiform = new CodepointRangeGenerator(0x12480, 0x1254F);
/** Unicode Block: Egyptian Hieroglyphs */
export const unicodeEgyptianHieroglyphs = new CodepointRangeGenerator(0x13000, 0x1342F);
/** Unicode Block: Anatolian Hieroglyphs */
export const unicodeAnatolianHieroglyphs = new CodepointRangeGenerator(0x14400, 0x1467F);
/** Unicode Block: Bamum Supplement */
export const unicodeBamumSupplement = new CodepointRangeGenerator(0x16800, 0x16A3F);
/** Unicode Block: Mro */
export const unicodeMro = new CodepointRangeGenerator(0x16A40, 0x16A6F);
/** Unicode Block: Bassa Vah */
export const unicodeBassaVah = new CodepointRangeGenerator(0x16AD0, 0x16AFF);
/** Unicode Block: Pahawh Hmong */
export const unicodePahawhHmong = new CodepointRangeGenerator(0x16B00, 0x16B8F);
/** Unicode Block: Miao */
export const unicodeMiao = new CodepointRangeGenerator(0x16F00, 0x16F9F);
/** Unicode Block: Ideographic Symbols and Punctuation */
export const unicodeIdeographicSymbolsAndPunctuation = new CodepointRangeGenerator(0x16FE0, 0x16FFF);
/** Unicode Block: Tangut */
export const unicodeTangut = new CodepointRangeGenerator(0x17000, 0x187FF);
/** Unicode Block: Tangut Components */
export const unicodeTangutComponents = new CodepointRangeGenerator(0x18800, 0x18AFF);
/** Unicode Block: Kana Supplement */
export const unicodeKanaSupplement = new CodepointRangeGenerator(0x1B000, 0x1B0FF);
/** Unicode Block: Kana Extended-A */
export const unicodeKanaExtendedA = new CodepointRangeGenerator(0x1B100, 0x1B12F);
/** Unicode Block: Nushu */
export const unicodeNushu = new CodepointRangeGenerator(0x1B170, 0x1B2FF);
/** Unicode Block: Duployan */
export const unicodeDuployan = new CodepointRangeGenerator(0x1BC00, 0x1BC9F);
/** Unicode Block: Shorthand Format Controls */
export const unicodeShorthandFormatControls = new CodepointRangeGenerator(0x1BCA0, 0x1BCAF);
/** Unicode Block: Byzantine Musical Symbols */
export const unicodeByzantineMusicalSymbols = new CodepointRangeGenerator(0x1D000, 0x1D0FF);
/** Unicode Block: Musical Symbols */
export const unicodeMusicalSymbols = new CodepointRangeGenerator(0x1D100, 0x1D1FF);
/** Unicode Block: Ancient Greek Musical Notation */
export const unicodeAncientGreekMusicalNotation = new CodepointRangeGenerator(0x1D200, 0x1D24F);
/** Unicode Block: Tai Xuan Jing Symbols */
export const unicodeTaiXuanJingSymbols = new CodepointRangeGenerator(0x1D300, 0x1D35F);
/** Unicode Block: Counting Rod Numerals */
export const unicodeCountingRodNumerals = new CodepointRangeGenerator(0x1D360, 0x1D37F);
/** Unicode Block: Mathematical Alphanumeric Symbols */
export const unicodeMathematicalAlphanumericSymbols = new CodepointRangeGenerator(0x1D400, 0x1D7FF);
/** Unicode Block: Sutton SignWriting */
export const unicodeSuttonSignWriting = new CodepointRangeGenerator(0x1D800, 0x1DAAF);
/** Unicode Block: Glagolitic Supplement */
export const unicodeGlagoliticSupplement = new CodepointRangeGenerator(0x1E000, 0x1E02F);
/** Unicode Block: Mende Kikakui */
export const unicodeMendeKikakui = new CodepointRangeGenerator(0x1E800, 0x1E8DF);
/** Unicode Block: Adlam */
export const unicodeAdlam = new CodepointRangeGenerator(0x1E900, 0x1E95F);
/** Unicode Block: Arabic Mathematical Alphabetic Symbols */
export const unicodeArabicMathematicalAlphabeticSymbols = new CodepointRangeGenerator(0x1EE00, 0x1EEFF);
/** Unicode Block: Mahjong Tiles */
export const unicodeMahjongTiles = new CodepointRangeGenerator(0x1F000, 0x1F02F);
/** Unicode Block: Domino Tiles */
export const unicodeDominoTiles = new CodepointRangeGenerator(0x1F030, 0x1F09F);
/** Unicode Block: Playing Cards */
export const unicodePlayingCards = new CodepointRangeGenerator(0x1F0A0, 0x1F0FF);
/** Unicode Block: Enclosed Alphanumeric Supplement */
export const unicodeEnclosedAlphanumericSupplement = new CodepointRangeGenerator(0x1F100, 0x1F1FF);
/** Unicode Block: Enclosed Ideographic Supplement */
export const unicodeEnclosedIdeographicSupplement = new CodepointRangeGenerator(0x1F200, 0x1F2FF);
/** Unicode Block: Miscellaneous Symbols and Pictographs */
export const unicodeMiscellaneousSymbolsAndPictographs = new CodepointRangeGenerator(0x1F300, 0x1F5FF);
/** Unicode Block: Emoticons */
export const unicodeEmoticons = new CodepointRangeGenerator(0x1F600, 0x1F64F);
/** Unicode Block: Ornamental Dingbats */
export const unicodeOrnamentalDingbats = new CodepointRangeGenerator(0x1F650, 0x1F67F);
/** Unicode Block: Transport and Map Symbols */
export const unicodeTransportAndMapSymbols = new CodepointRangeGenerator(0x1F680, 0x1F6FF);
/** Unicode Block: Alchemical Symbols */
export const unicodeAlchemicalSymbols = new CodepointRangeGenerator(0x1F700, 0x1F77F);
/** Unicode Block: Geometric Shapes Extended */
export const unicodeGeometricShapesExtended = new CodepointRangeGenerator(0x1F780, 0x1F7FF);
/** Unicode Block: Supplemental Arrows-C */
export const unicodeSupplementalArrowsC = new CodepointRangeGenerator(0x1F800, 0x1F8FF);
/** Unicode Block: Supplemental Symbols and Pictographs */
export const unicodeSupplementalSymbolsAndPictographs = new CodepointRangeGenerator(0x1F900, 0x1F9FF);
/** Unicode Block: CJK Unified Ideographs Extension B */
export const unicodeCJKUnifiedIdeographsExtensionB = new CodepointRangeGenerator(0x20000, 0x2A6DF);
/** Unicode Block: CJK Unified Ideographs Extension C */
export const unicodeCJKUnifiedIdeographsExtensionC = new CodepointRangeGenerator(0x2A700, 0x2B73F);
/** Unicode Block: CJK Unified Ideographs Extension D */
export const unicodeCJKUnifiedIdeographsExtensionD = new CodepointRangeGenerator(0x2B740, 0x2B81F);
/** Unicode Block: CJK Unified Ideographs Extension E */
export const unicodeCJKUnifiedIdeographsExtensionE = new CodepointRangeGenerator(0x2B820, 0x2CEAF);
/** Unicode Block: CJK Unified Ideographs Extension F */
export const unicodeCJKUnifiedIdeographsExtensionF = new CodepointRangeGenerator(0x2CEB0, 0x2EBEF);
/** Unicode Block: CJK Compatibility Ideographs Supplement */
export const unicodeCJKCompatibilityIdeographsSupplement = new CodepointRangeGenerator(0x2F800, 0x2FA1F);
/** Unicode Block: Tags */
export const unicodeTags = new CodepointRangeGenerator(0xE0000, 0xE007F);
/** Unicode Block: Variation Selectors Supplement */
export const unicodeVariationSelectorsSupplement = new CodepointRangeGenerator(0xE0100, 0xE01EF);
/** Unicode Block: Supplementary Private Use Area-A */
export const unicodeSupplementaryPrivateUseAreaA = new CodepointRangeGenerator(0xF0000, 0xFFFFF);
/** Unicode Block: Supplementary Private Use Area-B */
export const unicodeSupplementaryPrivateUseAreaB = new CodepointRangeGenerator(0x100000, 0x10FFFF);

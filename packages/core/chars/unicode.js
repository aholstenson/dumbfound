'use strict';

const { CharGenerator, CodepointRangeGenerator } = require('./generators');
const randomInt = require('../random/randomInt');

const MIN_SURROGATE = 0xD800;
const MAX_SURROGATE = 0xDFFF;
const SURROGATE_RANGE = MAX_SURROGATE - MIN_SURROGATE;

const MAX_CODEPOINT = 0x10FFFF;

const CODEPOINT_LENGTH = MAX_CODEPOINT - SURROGATE_RANGE;

class UnicodeGenerator extends CharGenerator {

	get length() {
		return CODEPOINT_LENGTH;
	}

	get(idx) {
		const codepoint = idx >= MIN_SURROGATE
			? idx + SURROGATE_RANGE
			: idx;

		return String.fromCodePoint(codepoint);
	}

	pick(random) {
		const idx = randomInt(random, 0, this.length);
		return this.get(idx);
	}
}

// Any Unicode character outside the surrogate range
module.exports = new UnicodeGenerator();


/*
 * Named blocks from the Unicode standard.
 *
 * Generated via unicode-block-generator.js
 */

/** Unicode Block: Basic Latin */
module.exports.basicLatin = new CodepointRangeGenerator(0x0000, 0x007F);
/** Unicode Block: Latin-1 Supplement */
module.exports.latin1Supplement = new CodepointRangeGenerator(0x0080, 0x00FF);
/** Unicode Block: Latin Extended-A */
module.exports.latinExtendedA = new CodepointRangeGenerator(0x0100, 0x017F);
/** Unicode Block: Latin Extended-B */
module.exports.latinExtendedB = new CodepointRangeGenerator(0x0180, 0x024F);
/** Unicode Block: IPA Extensions */
module.exports.ipaExtensions = new CodepointRangeGenerator(0x0250, 0x02AF);
/** Unicode Block: Spacing Modifier Letters */
module.exports.spacingModifierLetters = new CodepointRangeGenerator(0x02B0, 0x02FF);
/** Unicode Block: Combining Diacritical Marks */
module.exports.combiningDiacriticalMarks = new CodepointRangeGenerator(0x0300, 0x036F);
/** Unicode Block: Greek and Coptic */
module.exports.greekAndCoptic = new CodepointRangeGenerator(0x0370, 0x03FF);
/** Unicode Block: Cyrillic */
module.exports.cyrillic = new CodepointRangeGenerator(0x0400, 0x04FF);
/** Unicode Block: Cyrillic Supplement */
module.exports.cyrillicSupplement = new CodepointRangeGenerator(0x0500, 0x052F);
/** Unicode Block: Armenian */
module.exports.armenian = new CodepointRangeGenerator(0x0530, 0x058F);
/** Unicode Block: Hebrew */
module.exports.hebrew = new CodepointRangeGenerator(0x0590, 0x05FF);
/** Unicode Block: Arabic */
module.exports.arabic = new CodepointRangeGenerator(0x0600, 0x06FF);
/** Unicode Block: Syriac */
module.exports.syriac = new CodepointRangeGenerator(0x0700, 0x074F);
/** Unicode Block: Arabic Supplement */
module.exports.arabicSupplement = new CodepointRangeGenerator(0x0750, 0x077F);
/** Unicode Block: Thaana */
module.exports.thaana = new CodepointRangeGenerator(0x0780, 0x07BF);
/** Unicode Block: NKo */
module.exports.nko = new CodepointRangeGenerator(0x07C0, 0x07FF);
/** Unicode Block: Samaritan */
module.exports.samaritan = new CodepointRangeGenerator(0x0800, 0x083F);
/** Unicode Block: Mandaic */
module.exports.mandaic = new CodepointRangeGenerator(0x0840, 0x085F);
/** Unicode Block: Syriac Supplement */
module.exports.syriacSupplement = new CodepointRangeGenerator(0x0860, 0x086F);
/** Unicode Block: Arabic Extended-A */
module.exports.arabicExtendedA = new CodepointRangeGenerator(0x08A0, 0x08FF);
/** Unicode Block: Devanagari */
module.exports.devanagari = new CodepointRangeGenerator(0x0900, 0x097F);
/** Unicode Block: Bengali */
module.exports.bengali = new CodepointRangeGenerator(0x0980, 0x09FF);
/** Unicode Block: Gurmukhi */
module.exports.gurmukhi = new CodepointRangeGenerator(0x0A00, 0x0A7F);
/** Unicode Block: Gujarati */
module.exports.gujarati = new CodepointRangeGenerator(0x0A80, 0x0AFF);
/** Unicode Block: Oriya */
module.exports.oriya = new CodepointRangeGenerator(0x0B00, 0x0B7F);
/** Unicode Block: Tamil */
module.exports.tamil = new CodepointRangeGenerator(0x0B80, 0x0BFF);
/** Unicode Block: Telugu */
module.exports.telugu = new CodepointRangeGenerator(0x0C00, 0x0C7F);
/** Unicode Block: Kannada */
module.exports.kannada = new CodepointRangeGenerator(0x0C80, 0x0CFF);
/** Unicode Block: Malayalam */
module.exports.malayalam = new CodepointRangeGenerator(0x0D00, 0x0D7F);
/** Unicode Block: Sinhala */
module.exports.sinhala = new CodepointRangeGenerator(0x0D80, 0x0DFF);
/** Unicode Block: Thai */
module.exports.thai = new CodepointRangeGenerator(0x0E00, 0x0E7F);
/** Unicode Block: Lao */
module.exports.lao = new CodepointRangeGenerator(0x0E80, 0x0EFF);
/** Unicode Block: Tibetan */
module.exports.tibetan = new CodepointRangeGenerator(0x0F00, 0x0FFF);
/** Unicode Block: Myanmar */
module.exports.myanmar = new CodepointRangeGenerator(0x1000, 0x109F);
/** Unicode Block: Georgian */
module.exports.georgian = new CodepointRangeGenerator(0x10A0, 0x10FF);
/** Unicode Block: Hangul Jamo */
module.exports.hangulJamo = new CodepointRangeGenerator(0x1100, 0x11FF);
/** Unicode Block: Ethiopic */
module.exports.ethiopic = new CodepointRangeGenerator(0x1200, 0x137F);
/** Unicode Block: Ethiopic Supplement */
module.exports.ethiopicSupplement = new CodepointRangeGenerator(0x1380, 0x139F);
/** Unicode Block: Cherokee */
module.exports.cherokee = new CodepointRangeGenerator(0x13A0, 0x13FF);
/** Unicode Block: Unified Canadian Aboriginal Syllabics */
module.exports.unifiedCanadianAboriginalSyllabics = new CodepointRangeGenerator(0x1400, 0x167F);
/** Unicode Block: Ogham */
module.exports.ogham = new CodepointRangeGenerator(0x1680, 0x169F);
/** Unicode Block: Runic */
module.exports.runic = new CodepointRangeGenerator(0x16A0, 0x16FF);
/** Unicode Block: Tagalog */
module.exports.tagalog = new CodepointRangeGenerator(0x1700, 0x171F);
/** Unicode Block: Hanunoo */
module.exports.hanunoo = new CodepointRangeGenerator(0x1720, 0x173F);
/** Unicode Block: Buhid */
module.exports.buhid = new CodepointRangeGenerator(0x1740, 0x175F);
/** Unicode Block: Tagbanwa */
module.exports.tagbanwa = new CodepointRangeGenerator(0x1760, 0x177F);
/** Unicode Block: Khmer */
module.exports.khmer = new CodepointRangeGenerator(0x1780, 0x17FF);
/** Unicode Block: Mongolian */
module.exports.mongolian = new CodepointRangeGenerator(0x1800, 0x18AF);
/** Unicode Block: Unified Canadian Aboriginal Syllabics Extended */
module.exports.unifiedCanadianAboriginalSyllabicsExtended = new CodepointRangeGenerator(0x18B0, 0x18FF);
/** Unicode Block: Limbu */
module.exports.limbu = new CodepointRangeGenerator(0x1900, 0x194F);
/** Unicode Block: Tai Le */
module.exports.taiLe = new CodepointRangeGenerator(0x1950, 0x197F);
/** Unicode Block: New Tai Lue */
module.exports.newTaiLue = new CodepointRangeGenerator(0x1980, 0x19DF);
/** Unicode Block: Khmer Symbols */
module.exports.khmerSymbols = new CodepointRangeGenerator(0x19E0, 0x19FF);
/** Unicode Block: Buginese */
module.exports.buginese = new CodepointRangeGenerator(0x1A00, 0x1A1F);
/** Unicode Block: Tai Tham */
module.exports.taiTham = new CodepointRangeGenerator(0x1A20, 0x1AAF);
/** Unicode Block: Combining Diacritical Marks Extended */
module.exports.combiningDiacriticalMarksExtended = new CodepointRangeGenerator(0x1AB0, 0x1AFF);
/** Unicode Block: Balinese */
module.exports.balinese = new CodepointRangeGenerator(0x1B00, 0x1B7F);
/** Unicode Block: Sundanese */
module.exports.sundanese = new CodepointRangeGenerator(0x1B80, 0x1BBF);
/** Unicode Block: Batak */
module.exports.batak = new CodepointRangeGenerator(0x1BC0, 0x1BFF);
/** Unicode Block: Lepcha */
module.exports.lepcha = new CodepointRangeGenerator(0x1C00, 0x1C4F);
/** Unicode Block: Ol Chiki */
module.exports.olChiki = new CodepointRangeGenerator(0x1C50, 0x1C7F);
/** Unicode Block: Cyrillic Extended-C */
module.exports.cyrillicExtendedC = new CodepointRangeGenerator(0x1C80, 0x1C8F);
/** Unicode Block: Sundanese Supplement */
module.exports.sundaneseSupplement = new CodepointRangeGenerator(0x1CC0, 0x1CCF);
/** Unicode Block: Vedic Extensions */
module.exports.vedicExtensions = new CodepointRangeGenerator(0x1CD0, 0x1CFF);
/** Unicode Block: Phonetic Extensions */
module.exports.phoneticExtensions = new CodepointRangeGenerator(0x1D00, 0x1D7F);
/** Unicode Block: Phonetic Extensions Supplement */
module.exports.phoneticExtensionsSupplement = new CodepointRangeGenerator(0x1D80, 0x1DBF);
/** Unicode Block: Combining Diacritical Marks Supplement */
module.exports.combiningDiacriticalMarksSupplement = new CodepointRangeGenerator(0x1DC0, 0x1DFF);
/** Unicode Block: Latin Extended Additional */
module.exports.latinExtendedAdditional = new CodepointRangeGenerator(0x1E00, 0x1EFF);
/** Unicode Block: Greek Extended */
module.exports.greekExtended = new CodepointRangeGenerator(0x1F00, 0x1FFF);
/** Unicode Block: General Punctuation */
module.exports.generalPunctuation = new CodepointRangeGenerator(0x2000, 0x206F);
/** Unicode Block: Superscripts and Subscripts */
module.exports.superscriptsAndSubscripts = new CodepointRangeGenerator(0x2070, 0x209F);
/** Unicode Block: Currency Symbols */
module.exports.currencySymbols = new CodepointRangeGenerator(0x20A0, 0x20CF);
/** Unicode Block: Combining Diacritical Marks for Symbols */
module.exports.combiningDiacriticalMarksForSymbols = new CodepointRangeGenerator(0x20D0, 0x20FF);
/** Unicode Block: Letterlike Symbols */
module.exports.letterlikeSymbols = new CodepointRangeGenerator(0x2100, 0x214F);
/** Unicode Block: Number Forms */
module.exports.numberForms = new CodepointRangeGenerator(0x2150, 0x218F);
/** Unicode Block: Arrows */
module.exports.arrows = new CodepointRangeGenerator(0x2190, 0x21FF);
/** Unicode Block: Mathematical Operators */
module.exports.mathematicalOperators = new CodepointRangeGenerator(0x2200, 0x22FF);
/** Unicode Block: Miscellaneous Technical */
module.exports.miscellaneousTechnical = new CodepointRangeGenerator(0x2300, 0x23FF);
/** Unicode Block: Control Pictures */
module.exports.controlPictures = new CodepointRangeGenerator(0x2400, 0x243F);
/** Unicode Block: Optical Character Recognition */
module.exports.opticalCharacterRecognition = new CodepointRangeGenerator(0x2440, 0x245F);
/** Unicode Block: Enclosed Alphanumerics */
module.exports.enclosedAlphanumerics = new CodepointRangeGenerator(0x2460, 0x24FF);
/** Unicode Block: Box Drawing */
module.exports.boxDrawing = new CodepointRangeGenerator(0x2500, 0x257F);
/** Unicode Block: Block Elements */
module.exports.blockElements = new CodepointRangeGenerator(0x2580, 0x259F);
/** Unicode Block: Geometric Shapes */
module.exports.geometricShapes = new CodepointRangeGenerator(0x25A0, 0x25FF);
/** Unicode Block: Miscellaneous Symbols */
module.exports.miscellaneousSymbols = new CodepointRangeGenerator(0x2600, 0x26FF);
/** Unicode Block: Dingbats */
module.exports.dingbats = new CodepointRangeGenerator(0x2700, 0x27BF);
/** Unicode Block: Miscellaneous Mathematical Symbols-A */
module.exports.miscellaneousMathematicalSymbolsA = new CodepointRangeGenerator(0x27C0, 0x27EF);
/** Unicode Block: Supplemental Arrows-A */
module.exports.supplementalArrowsA = new CodepointRangeGenerator(0x27F0, 0x27FF);
/** Unicode Block: Braille Patterns */
module.exports.braillePatterns = new CodepointRangeGenerator(0x2800, 0x28FF);
/** Unicode Block: Supplemental Arrows-B */
module.exports.supplementalArrowsB = new CodepointRangeGenerator(0x2900, 0x297F);
/** Unicode Block: Miscellaneous Mathematical Symbols-B */
module.exports.miscellaneousMathematicalSymbolsB = new CodepointRangeGenerator(0x2980, 0x29FF);
/** Unicode Block: Supplemental Mathematical Operators */
module.exports.supplementalMathematicalOperators = new CodepointRangeGenerator(0x2A00, 0x2AFF);
/** Unicode Block: Miscellaneous Symbols and Arrows */
module.exports.miscellaneousSymbolsAndArrows = new CodepointRangeGenerator(0x2B00, 0x2BFF);
/** Unicode Block: Glagolitic */
module.exports.glagolitic = new CodepointRangeGenerator(0x2C00, 0x2C5F);
/** Unicode Block: Latin Extended-C */
module.exports.latinExtendedC = new CodepointRangeGenerator(0x2C60, 0x2C7F);
/** Unicode Block: Coptic */
module.exports.coptic = new CodepointRangeGenerator(0x2C80, 0x2CFF);
/** Unicode Block: Georgian Supplement */
module.exports.georgianSupplement = new CodepointRangeGenerator(0x2D00, 0x2D2F);
/** Unicode Block: Tifinagh */
module.exports.tifinagh = new CodepointRangeGenerator(0x2D30, 0x2D7F);
/** Unicode Block: Ethiopic Extended */
module.exports.ethiopicExtended = new CodepointRangeGenerator(0x2D80, 0x2DDF);
/** Unicode Block: Cyrillic Extended-A */
module.exports.cyrillicExtendedA = new CodepointRangeGenerator(0x2DE0, 0x2DFF);
/** Unicode Block: Supplemental Punctuation */
module.exports.supplementalPunctuation = new CodepointRangeGenerator(0x2E00, 0x2E7F);
/** Unicode Block: CJK Radicals Supplement */
module.exports.cjkRadicalsSupplement = new CodepointRangeGenerator(0x2E80, 0x2EFF);
/** Unicode Block: Kangxi Radicals */
module.exports.kangxiRadicals = new CodepointRangeGenerator(0x2F00, 0x2FDF);
/** Unicode Block: Ideographic Description Characters */
module.exports.ideographicDescriptionCharacters = new CodepointRangeGenerator(0x2FF0, 0x2FFF);
/** Unicode Block: CJK Symbols and Punctuation */
module.exports.cjkSymbolsAndPunctuation = new CodepointRangeGenerator(0x3000, 0x303F);
/** Unicode Block: Hiragana */
module.exports.hiragana = new CodepointRangeGenerator(0x3040, 0x309F);
/** Unicode Block: Katakana */
module.exports.katakana = new CodepointRangeGenerator(0x30A0, 0x30FF);
/** Unicode Block: Bopomofo */
module.exports.bopomofo = new CodepointRangeGenerator(0x3100, 0x312F);
/** Unicode Block: Hangul Compatibility Jamo */
module.exports.hangulCompatibilityJamo = new CodepointRangeGenerator(0x3130, 0x318F);
/** Unicode Block: Kanbun */
module.exports.kanbun = new CodepointRangeGenerator(0x3190, 0x319F);
/** Unicode Block: Bopomofo Extended */
module.exports.bopomofoExtended = new CodepointRangeGenerator(0x31A0, 0x31BF);
/** Unicode Block: CJK Strokes */
module.exports.cjkStrokes = new CodepointRangeGenerator(0x31C0, 0x31EF);
/** Unicode Block: Katakana Phonetic Extensions */
module.exports.katakanaPhoneticExtensions = new CodepointRangeGenerator(0x31F0, 0x31FF);
/** Unicode Block: Enclosed CJK Letters and Months */
module.exports.enclosedCJKLettersAndMonths = new CodepointRangeGenerator(0x3200, 0x32FF);
/** Unicode Block: CJK Compatibility */
module.exports.cjkCompatibility = new CodepointRangeGenerator(0x3300, 0x33FF);
/** Unicode Block: CJK Unified Ideographs Extension A */
module.exports.cjkUnifiedIdeographsExtensionA = new CodepointRangeGenerator(0x3400, 0x4DBF);
/** Unicode Block: Yijing Hexagram Symbols */
module.exports.yijingHexagramSymbols = new CodepointRangeGenerator(0x4DC0, 0x4DFF);
/** Unicode Block: CJK Unified Ideographs */
module.exports.cjkUnifiedIdeographs = new CodepointRangeGenerator(0x4E00, 0x9FFF);
/** Unicode Block: Yi Syllables */
module.exports.yiSyllables = new CodepointRangeGenerator(0xA000, 0xA48F);
/** Unicode Block: Yi Radicals */
module.exports.yiRadicals = new CodepointRangeGenerator(0xA490, 0xA4CF);
/** Unicode Block: Lisu */
module.exports.lisu = new CodepointRangeGenerator(0xA4D0, 0xA4FF);
/** Unicode Block: Vai */
module.exports.vai = new CodepointRangeGenerator(0xA500, 0xA63F);
/** Unicode Block: Cyrillic Extended-B */
module.exports.cyrillicExtendedB = new CodepointRangeGenerator(0xA640, 0xA69F);
/** Unicode Block: Bamum */
module.exports.bamum = new CodepointRangeGenerator(0xA6A0, 0xA6FF);
/** Unicode Block: Modifier Tone Letters */
module.exports.modifierToneLetters = new CodepointRangeGenerator(0xA700, 0xA71F);
/** Unicode Block: Latin Extended-D */
module.exports.latinExtendedD = new CodepointRangeGenerator(0xA720, 0xA7FF);
/** Unicode Block: Syloti Nagri */
module.exports.sylotiNagri = new CodepointRangeGenerator(0xA800, 0xA82F);
/** Unicode Block: Common Indic Number Forms */
module.exports.commonIndicNumberForms = new CodepointRangeGenerator(0xA830, 0xA83F);
/** Unicode Block: Phags-pa */
module.exports.phagspa = new CodepointRangeGenerator(0xA840, 0xA87F);
/** Unicode Block: Saurashtra */
module.exports.saurashtra = new CodepointRangeGenerator(0xA880, 0xA8DF);
/** Unicode Block: Devanagari Extended */
module.exports.devanagariExtended = new CodepointRangeGenerator(0xA8E0, 0xA8FF);
/** Unicode Block: Kayah Li */
module.exports.kayahLi = new CodepointRangeGenerator(0xA900, 0xA92F);
/** Unicode Block: Rejang */
module.exports.rejang = new CodepointRangeGenerator(0xA930, 0xA95F);
/** Unicode Block: Hangul Jamo Extended-A */
module.exports.hangulJamoExtendedA = new CodepointRangeGenerator(0xA960, 0xA97F);
/** Unicode Block: Javanese */
module.exports.javanese = new CodepointRangeGenerator(0xA980, 0xA9DF);
/** Unicode Block: Myanmar Extended-B */
module.exports.myanmarExtendedB = new CodepointRangeGenerator(0xA9E0, 0xA9FF);
/** Unicode Block: Cham */
module.exports.cham = new CodepointRangeGenerator(0xAA00, 0xAA5F);
/** Unicode Block: Myanmar Extended-A */
module.exports.myanmarExtendedA = new CodepointRangeGenerator(0xAA60, 0xAA7F);
/** Unicode Block: Tai Viet */
module.exports.taiViet = new CodepointRangeGenerator(0xAA80, 0xAADF);
/** Unicode Block: Meetei Mayek Extensions */
module.exports.meeteiMayekExtensions = new CodepointRangeGenerator(0xAAE0, 0xAAFF);
/** Unicode Block: Ethiopic Extended-A */
module.exports.ethiopicExtendedA = new CodepointRangeGenerator(0xAB00, 0xAB2F);
/** Unicode Block: Latin Extended-E */
module.exports.latinExtendedE = new CodepointRangeGenerator(0xAB30, 0xAB6F);
/** Unicode Block: Cherokee Supplement */
module.exports.cherokeeSupplement = new CodepointRangeGenerator(0xAB70, 0xABBF);
/** Unicode Block: Meetei Mayek */
module.exports.meeteiMayek = new CodepointRangeGenerator(0xABC0, 0xABFF);
/** Unicode Block: Hangul Syllables */
module.exports.hangulSyllables = new CodepointRangeGenerator(0xAC00, 0xD7AF);
/** Unicode Block: Hangul Jamo Extended-B */
module.exports.hangulJamoExtendedB = new CodepointRangeGenerator(0xD7B0, 0xD7FF);
/** Unicode Block: High Surrogates */
module.exports.highSurrogates = new CodepointRangeGenerator(0xD800, 0xDB7F);
/** Unicode Block: High Private Use Surrogates */
module.exports.highPrivateUseSurrogates = new CodepointRangeGenerator(0xDB80, 0xDBFF);
/** Unicode Block: Low Surrogates */
module.exports.lowSurrogates = new CodepointRangeGenerator(0xDC00, 0xDFFF);
/** Unicode Block: Private Use Area */
module.exports.privateUseArea = new CodepointRangeGenerator(0xE000, 0xF8FF);
/** Unicode Block: CJK Compatibility Ideographs */
module.exports.cjkCompatibilityIdeographs = new CodepointRangeGenerator(0xF900, 0xFAFF);
/** Unicode Block: Generatoric Presentation Forms */
module.exports.GeneratoricPresentationForms = new CodepointRangeGenerator(0xFB00, 0xFB4F);
/** Unicode Block: Arabic Presentation Forms-A */
module.exports.arabicPresentationFormsA = new CodepointRangeGenerator(0xFB50, 0xFDFF);
/** Unicode Block: Variation Selectors */
module.exports.variationSelectors = new CodepointRangeGenerator(0xFE00, 0xFE0F);
/** Unicode Block: Vertical Forms */
module.exports.verticalForms = new CodepointRangeGenerator(0xFE10, 0xFE1F);
/** Unicode Block: Combining Half Marks */
module.exports.combiningHalfMarks = new CodepointRangeGenerator(0xFE20, 0xFE2F);
/** Unicode Block: CJK Compatibility Forms */
module.exports.cjkCompatibilityForms = new CodepointRangeGenerator(0xFE30, 0xFE4F);
/** Unicode Block: Small Form Variants */
module.exports.smallFormVariants = new CodepointRangeGenerator(0xFE50, 0xFE6F);
/** Unicode Block: Arabic Presentation Forms-B */
module.exports.arabicPresentationFormsB = new CodepointRangeGenerator(0xFE70, 0xFEFF);
/** Unicode Block: Halfwidth and Fullwidth Forms */
module.exports.halfwidthAndFullwidthForms = new CodepointRangeGenerator(0xFF00, 0xFFEF);
/** Unicode Block: Specials */
module.exports.specials = new CodepointRangeGenerator(0xFFF0, 0xFFFF);
/** Unicode Block: Linear B Syllabary */
module.exports.linearBSyllabary = new CodepointRangeGenerator(0x10000, 0x1007F);
/** Unicode Block: Linear B Ideograms */
module.exports.linearBIdeograms = new CodepointRangeGenerator(0x10080, 0x100FF);
/** Unicode Block: Aegean Numbers */
module.exports.aegeanNumbers = new CodepointRangeGenerator(0x10100, 0x1013F);
/** Unicode Block: Ancient Greek Numbers */
module.exports.ancientGreekNumbers = new CodepointRangeGenerator(0x10140, 0x1018F);
/** Unicode Block: Ancient Symbols */
module.exports.ancientSymbols = new CodepointRangeGenerator(0x10190, 0x101CF);
/** Unicode Block: Phaistos Disc */
module.exports.phaistosDisc = new CodepointRangeGenerator(0x101D0, 0x101FF);
/** Unicode Block: Lycian */
module.exports.lycian = new CodepointRangeGenerator(0x10280, 0x1029F);
/** Unicode Block: Carian */
module.exports.carian = new CodepointRangeGenerator(0x102A0, 0x102DF);
/** Unicode Block: Coptic Epact Numbers */
module.exports.copticEpactNumbers = new CodepointRangeGenerator(0x102E0, 0x102FF);
/** Unicode Block: Old Italic */
module.exports.oldItalic = new CodepointRangeGenerator(0x10300, 0x1032F);
/** Unicode Block: Gothic */
module.exports.gothic = new CodepointRangeGenerator(0x10330, 0x1034F);
/** Unicode Block: Old Permic */
module.exports.oldPermic = new CodepointRangeGenerator(0x10350, 0x1037F);
/** Unicode Block: Ugaritic */
module.exports.ugaritic = new CodepointRangeGenerator(0x10380, 0x1039F);
/** Unicode Block: Old Persian */
module.exports.oldPersian = new CodepointRangeGenerator(0x103A0, 0x103DF);
/** Unicode Block: Deseret */
module.exports.deseret = new CodepointRangeGenerator(0x10400, 0x1044F);
/** Unicode Block: Shavian */
module.exports.shavian = new CodepointRangeGenerator(0x10450, 0x1047F);
/** Unicode Block: Osmanya */
module.exports.osmanya = new CodepointRangeGenerator(0x10480, 0x104AF);
/** Unicode Block: Osage */
module.exports.osage = new CodepointRangeGenerator(0x104B0, 0x104FF);
/** Unicode Block: Elbasan */
module.exports.elbasan = new CodepointRangeGenerator(0x10500, 0x1052F);
/** Unicode Block: Caucasian Albanian */
module.exports.caucasianAlbanian = new CodepointRangeGenerator(0x10530, 0x1056F);
/** Unicode Block: Linear A */
module.exports.linearA = new CodepointRangeGenerator(0x10600, 0x1077F);
/** Unicode Block: Cypriot Syllabary */
module.exports.cypriotSyllabary = new CodepointRangeGenerator(0x10800, 0x1083F);
/** Unicode Block: Imperial Aramaic */
module.exports.imperialAramaic = new CodepointRangeGenerator(0x10840, 0x1085F);
/** Unicode Block: Palmyrene */
module.exports.palmyrene = new CodepointRangeGenerator(0x10860, 0x1087F);
/** Unicode Block: Nabataean */
module.exports.nabataean = new CodepointRangeGenerator(0x10880, 0x108AF);
/** Unicode Block: Hatran */
module.exports.hatran = new CodepointRangeGenerator(0x108E0, 0x108FF);
/** Unicode Block: Phoenician */
module.exports.phoenician = new CodepointRangeGenerator(0x10900, 0x1091F);
/** Unicode Block: Lydian */
module.exports.lydian = new CodepointRangeGenerator(0x10920, 0x1093F);
/** Unicode Block: Meroitic Hieroglyphs */
module.exports.meroiticHieroglyphs = new CodepointRangeGenerator(0x10980, 0x1099F);
/** Unicode Block: Meroitic Cursive */
module.exports.meroiticCursive = new CodepointRangeGenerator(0x109A0, 0x109FF);
/** Unicode Block: Kharoshthi */
module.exports.kharoshthi = new CodepointRangeGenerator(0x10A00, 0x10A5F);
/** Unicode Block: Old South Arabian */
module.exports.oldSouthArabian = new CodepointRangeGenerator(0x10A60, 0x10A7F);
/** Unicode Block: Old North Arabian */
module.exports.oldNorthArabian = new CodepointRangeGenerator(0x10A80, 0x10A9F);
/** Unicode Block: Manichaean */
module.exports.manichaean = new CodepointRangeGenerator(0x10AC0, 0x10AFF);
/** Unicode Block: Avestan */
module.exports.avestan = new CodepointRangeGenerator(0x10B00, 0x10B3F);
/** Unicode Block: Inscriptional Parthian */
module.exports.inscriptionalParthian = new CodepointRangeGenerator(0x10B40, 0x10B5F);
/** Unicode Block: Inscriptional Pahlavi */
module.exports.inscriptionalPahlavi = new CodepointRangeGenerator(0x10B60, 0x10B7F);
/** Unicode Block: Psalter Pahlavi */
module.exports.psalterPahlavi = new CodepointRangeGenerator(0x10B80, 0x10BAF);
/** Unicode Block: Old Turkic */
module.exports.oldTurkic = new CodepointRangeGenerator(0x10C00, 0x10C4F);
/** Unicode Block: Old Hungarian */
module.exports.oldHungarian = new CodepointRangeGenerator(0x10C80, 0x10CFF);
/** Unicode Block: Rumi Numeral Symbols */
module.exports.rumiNumeralSymbols = new CodepointRangeGenerator(0x10E60, 0x10E7F);
/** Unicode Block: Brahmi */
module.exports.brahmi = new CodepointRangeGenerator(0x11000, 0x1107F);
/** Unicode Block: Kaithi */
module.exports.kaithi = new CodepointRangeGenerator(0x11080, 0x110CF);
/** Unicode Block: Sora Sompeng */
module.exports.soraSompeng = new CodepointRangeGenerator(0x110D0, 0x110FF);
/** Unicode Block: Chakma */
module.exports.chakma = new CodepointRangeGenerator(0x11100, 0x1114F);
/** Unicode Block: Mahajani */
module.exports.mahajani = new CodepointRangeGenerator(0x11150, 0x1117F);
/** Unicode Block: Sharada */
module.exports.sharada = new CodepointRangeGenerator(0x11180, 0x111DF);
/** Unicode Block: Sinhala Archaic Numbers */
module.exports.sinhalaArchaicNumbers = new CodepointRangeGenerator(0x111E0, 0x111FF);
/** Unicode Block: Khojki */
module.exports.khojki = new CodepointRangeGenerator(0x11200, 0x1124F);
/** Unicode Block: Multani */
module.exports.multani = new CodepointRangeGenerator(0x11280, 0x112AF);
/** Unicode Block: Khudawadi */
module.exports.khudawadi = new CodepointRangeGenerator(0x112B0, 0x112FF);
/** Unicode Block: Grantha */
module.exports.grantha = new CodepointRangeGenerator(0x11300, 0x1137F);
/** Unicode Block: Newa */
module.exports.newa = new CodepointRangeGenerator(0x11400, 0x1147F);
/** Unicode Block: Tirhuta */
module.exports.tirhuta = new CodepointRangeGenerator(0x11480, 0x114DF);
/** Unicode Block: Siddham */
module.exports.siddham = new CodepointRangeGenerator(0x11580, 0x115FF);
/** Unicode Block: Modi */
module.exports.modi = new CodepointRangeGenerator(0x11600, 0x1165F);
/** Unicode Block: Mongolian Supplement */
module.exports.mongolianSupplement = new CodepointRangeGenerator(0x11660, 0x1167F);
/** Unicode Block: Takri */
module.exports.takri = new CodepointRangeGenerator(0x11680, 0x116CF);
/** Unicode Block: Ahom */
module.exports.ahom = new CodepointRangeGenerator(0x11700, 0x1173F);
/** Unicode Block: Warang Citi */
module.exports.warangCiti = new CodepointRangeGenerator(0x118A0, 0x118FF);
/** Unicode Block: Zanabazar Square */
module.exports.zanabazarSquare = new CodepointRangeGenerator(0x11A00, 0x11A4F);
/** Unicode Block: Soyombo */
module.exports.soyombo = new CodepointRangeGenerator(0x11A50, 0x11AAF);
/** Unicode Block: Pau Cin Hau */
module.exports.pauCinHau = new CodepointRangeGenerator(0x11AC0, 0x11AFF);
/** Unicode Block: Bhaiksuki */
module.exports.bhaiksuki = new CodepointRangeGenerator(0x11C00, 0x11C6F);
/** Unicode Block: Marchen */
module.exports.marchen = new CodepointRangeGenerator(0x11C70, 0x11CBF);
/** Unicode Block: Masaram Gondi */
module.exports.masaramGondi = new CodepointRangeGenerator(0x11D00, 0x11D5F);
/** Unicode Block: Cuneiform */
module.exports.cuneiform = new CodepointRangeGenerator(0x12000, 0x123FF);
/** Unicode Block: Cuneiform Numbers and Punctuation */
module.exports.cuneiformNumbersAndPunctuation = new CodepointRangeGenerator(0x12400, 0x1247F);
/** Unicode Block: Early Dynastic Cuneiform */
module.exports.earlyDynasticCuneiform = new CodepointRangeGenerator(0x12480, 0x1254F);
/** Unicode Block: Egyptian Hieroglyphs */
module.exports.egyptianHieroglyphs = new CodepointRangeGenerator(0x13000, 0x1342F);
/** Unicode Block: Anatolian Hieroglyphs */
module.exports.anatolianHieroglyphs = new CodepointRangeGenerator(0x14400, 0x1467F);
/** Unicode Block: Bamum Supplement */
module.exports.bamumSupplement = new CodepointRangeGenerator(0x16800, 0x16A3F);
/** Unicode Block: Mro */
module.exports.mro = new CodepointRangeGenerator(0x16A40, 0x16A6F);
/** Unicode Block: Bassa Vah */
module.exports.bassaVah = new CodepointRangeGenerator(0x16AD0, 0x16AFF);
/** Unicode Block: Pahawh Hmong */
module.exports.pahawhHmong = new CodepointRangeGenerator(0x16B00, 0x16B8F);
/** Unicode Block: Miao */
module.exports.miao = new CodepointRangeGenerator(0x16F00, 0x16F9F);
/** Unicode Block: Ideographic Symbols and Punctuation */
module.exports.ideographicSymbolsAndPunctuation = new CodepointRangeGenerator(0x16FE0, 0x16FFF);
/** Unicode Block: Tangut */
module.exports.tangut = new CodepointRangeGenerator(0x17000, 0x187FF);
/** Unicode Block: Tangut Components */
module.exports.tangutComponents = new CodepointRangeGenerator(0x18800, 0x18AFF);
/** Unicode Block: Kana Supplement */
module.exports.kanaSupplement = new CodepointRangeGenerator(0x1B000, 0x1B0FF);
/** Unicode Block: Kana Extended-A */
module.exports.kanaExtendedA = new CodepointRangeGenerator(0x1B100, 0x1B12F);
/** Unicode Block: Nushu */
module.exports.nushu = new CodepointRangeGenerator(0x1B170, 0x1B2FF);
/** Unicode Block: Duployan */
module.exports.duployan = new CodepointRangeGenerator(0x1BC00, 0x1BC9F);
/** Unicode Block: Shorthand Format Controls */
module.exports.shorthandFormatControls = new CodepointRangeGenerator(0x1BCA0, 0x1BCAF);
/** Unicode Block: Byzantine Musical Symbols */
module.exports.byzantineMusicalSymbols = new CodepointRangeGenerator(0x1D000, 0x1D0FF);
/** Unicode Block: Musical Symbols */
module.exports.musicalSymbols = new CodepointRangeGenerator(0x1D100, 0x1D1FF);
/** Unicode Block: Ancient Greek Musical Notation */
module.exports.ancientGreekMusicalNotation = new CodepointRangeGenerator(0x1D200, 0x1D24F);
/** Unicode Block: Tai Xuan Jing Symbols */
module.exports.taiXuanJingSymbols = new CodepointRangeGenerator(0x1D300, 0x1D35F);
/** Unicode Block: Counting Rod Numerals */
module.exports.countingRodNumerals = new CodepointRangeGenerator(0x1D360, 0x1D37F);
/** Unicode Block: Mathematical Alphanumeric Symbols */
module.exports.mathematicalAlphanumericSymbols = new CodepointRangeGenerator(0x1D400, 0x1D7FF);
/** Unicode Block: Sutton SignWriting */
module.exports.suttonSignWriting = new CodepointRangeGenerator(0x1D800, 0x1DAAF);
/** Unicode Block: Glagolitic Supplement */
module.exports.glagoliticSupplement = new CodepointRangeGenerator(0x1E000, 0x1E02F);
/** Unicode Block: Mende Kikakui */
module.exports.mendeKikakui = new CodepointRangeGenerator(0x1E800, 0x1E8DF);
/** Unicode Block: Adlam */
module.exports.adlam = new CodepointRangeGenerator(0x1E900, 0x1E95F);
/** Unicode Block: Arabic Mathematical Generatoric Symbols */
module.exports.arabicMathematicalGeneratoricSymbols = new CodepointRangeGenerator(0x1EE00, 0x1EEFF);
/** Unicode Block: Mahjong Tiles */
module.exports.mahjongTiles = new CodepointRangeGenerator(0x1F000, 0x1F02F);
/** Unicode Block: Domino Tiles */
module.exports.dominoTiles = new CodepointRangeGenerator(0x1F030, 0x1F09F);
/** Unicode Block: Playing Cards */
module.exports.playingCards = new CodepointRangeGenerator(0x1F0A0, 0x1F0FF);
/** Unicode Block: Enclosed Alphanumeric Supplement */
module.exports.enclosedAlphanumericSupplement = new CodepointRangeGenerator(0x1F100, 0x1F1FF);
/** Unicode Block: Enclosed Ideographic Supplement */
module.exports.enclosedIdeographicSupplement = new CodepointRangeGenerator(0x1F200, 0x1F2FF);
/** Unicode Block: Miscellaneous Symbols and Pictographs */
module.exports.miscellaneousSymbolsAndPictographs = new CodepointRangeGenerator(0x1F300, 0x1F5FF);
/** Unicode Block: Emoticons */
module.exports.emoticons = new CodepointRangeGenerator(0x1F600, 0x1F64F);
/** Unicode Block: Ornamental Dingbats */
module.exports.ornamentalDingbats = new CodepointRangeGenerator(0x1F650, 0x1F67F);
/** Unicode Block: Transport and Map Symbols */
module.exports.transportAndMapSymbols = new CodepointRangeGenerator(0x1F680, 0x1F6FF);
/** Unicode Block: Alchemical Symbols */
module.exports.alchemicalSymbols = new CodepointRangeGenerator(0x1F700, 0x1F77F);
/** Unicode Block: Geometric Shapes Extended */
module.exports.geometricShapesExtended = new CodepointRangeGenerator(0x1F780, 0x1F7FF);
/** Unicode Block: Supplemental Arrows-C */
module.exports.supplementalArrowsC = new CodepointRangeGenerator(0x1F800, 0x1F8FF);
/** Unicode Block: Supplemental Symbols and Pictographs */
module.exports.supplementalSymbolsAndPictographs = new CodepointRangeGenerator(0x1F900, 0x1F9FF);
/** Unicode Block: CJK Unified Ideographs Extension B */
module.exports.cjkUnifiedIdeographsExtensionB = new CodepointRangeGenerator(0x20000, 0x2A6DF);
/** Unicode Block: CJK Unified Ideographs Extension C */
module.exports.cjkUnifiedIdeographsExtensionC = new CodepointRangeGenerator(0x2A700, 0x2B73F);
/** Unicode Block: CJK Unified Ideographs Extension D */
module.exports.cjkUnifiedIdeographsExtensionD = new CodepointRangeGenerator(0x2B740, 0x2B81F);
/** Unicode Block: CJK Unified Ideographs Extension E */
module.exports.cjkUnifiedIdeographsExtensionE = new CodepointRangeGenerator(0x2B820, 0x2CEAF);
/** Unicode Block: CJK Unified Ideographs Extension F */
module.exports.cjkUnifiedIdeographsExtensionF = new CodepointRangeGenerator(0x2CEB0, 0x2EBEF);
/** Unicode Block: CJK Compatibility Ideographs Supplement */
module.exports.cjkCompatibilityIdeographsSupplement = new CodepointRangeGenerator(0x2F800, 0x2FA1F);
/** Unicode Block: Tags */
module.exports.tags = new CodepointRangeGenerator(0xE0000, 0xE007F);
/** Unicode Block: Variation Selectors Supplement */
module.exports.variationSelectorsSupplement = new CodepointRangeGenerator(0xE0100, 0xE01EF);
/** Unicode Block: Supplementary Private Use Area-A */
module.exports.supplementaryPrivateUseAreaA = new CodepointRangeGenerator(0xF0000, 0xFFFFF);
/** Unicode Block: Supplementary Private Use Area-B */
module.exports.supplementaryPrivateUseAreaB = new CodepointRangeGenerator(0x100000, 0x10FFFF);

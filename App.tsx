import React, { useState, useCallback } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import InputField from './components/InputField';
import SelectField from './components/SelectField';
import Button from './components/Button';
import GeneratedPromptDisplay from './components/GeneratedPromptDisplay';
import { PromptElements, PromptElementKeyType } from './types';

const initialPromptState: PromptElements = {
  subject: '',
  action: '',
  expression: '',
  setting: '',
  timeOfDay: '',
  cameraMovement: '',
  lighting: '',
  videoStyle: '',
  videoMood: '',
  soundMusic: '',
  spokenNarration: '',
  additionalDetails: '',
};

// Assuming process.env.API_KEY is set in the environment
const API_KEY = process.env.API_KEY;
let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("API_KEY for Gemini is not set. Prompt generation will be disabled.");
}

const SparklesIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 13.75l-1.25-1.75L14.25 12l1.5-1.25L17 8.75l1.25 1.75L19.75 12l-1.5 1.25z" />
  </svg>
);

const TrashIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09.998-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const App: React.FC = () => {
  const [promptData, setPromptData] = useState<PromptElements>(initialPromptState);
  const [generatedIndonesianPrompt, setGeneratedIndonesianPrompt] = useState<string>('');
  const [generatedEnglishPrompt, setGeneratedEnglishPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setPromptData(prev => ({ ...prev, [name as PromptElementKeyType]: value }));
  }, []);
  
  const handleIndonesianPromptChange = useCallback((newPrompt: string) => {
    setGeneratedIndonesianPrompt(newPrompt);
  }, []);

  const handleGeneratePrompt = useCallback(async () => {
    if (!ai) {
      setError("Gemini API client is not initialized. Please ensure API_KEY is configured.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedIndonesianPrompt('');
    setGeneratedEnglishPrompt('');

    const filledElements = Object.entries(promptData)
      .filter(([, value]) => value.trim() !== '')
      .map(([key, value]) => `*   ${inputFieldsConfig.find(f => f.key === key)?.label || key}: ${value}`)
      .join('\n');

    if (!filledElements) {
        setError("Mohon isi setidaknya satu kolom untuk membuat prompt.");
        setIsLoading(false);
        return;
    }
    
    const enhancementPrompt = `Anda adalah asisten pembuatan prompt video AI yang kreatif. Berdasarkan elemen-elemen berikut, buatlah deskripsi prompt video yang detail, kaya akan visual, dan mengalir secara naratif dalam Bahasa Indonesia. Pastikan hasilnya adalah satu paragraf deskriptif yang koheren dan siap pakai untuk model AI teks-ke-video, bukan hanya daftar ulang elemen. Kembangkan ide dari setiap elemen untuk menciptakan gambaran yang lebih hidup dan sinematik.

Elemen-elemen yang diberikan pengguna:
${filledElements}
${promptData.spokenNarration ? `*   Kalimat yang Diucapkan / Narasi: "${promptData.spokenNarration}" (Sertakan bagian ini apa adanya dalam prompt yang dihasilkan, dan jelaskan bahwa ini adalah narasi atau dialog.)` : ''}

Contoh transformasi jika diberi input sederhana:
Input Kering: Subjek: naga, Aksi: terbang, Tempat: gunung berapi, Waktu: senja.
Output yang Diinginkan (lebih detail & naratif): 'Seekor naga perkasa dengan sisik berkilauan merah membara terbang anggun melintasi puncak gunung berapi yang aktif, asap tebal mengepul di bawahnya saat langit senja memancarkan warna oranye dan ungu yang dramatis.'

Buatlah prompt berdasarkan elemen yang diberikan pengguna. Buatlah semenarik dan sedetail mungkin.`;

    try {
      const enhancementResponse: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: enhancementPrompt,
      });
      const enhancedIndonesianText = enhancementResponse.text;
      setGeneratedIndonesianPrompt(enhancedIndonesianText);

      const translationPrompt = `Translate the following Indonesian video prompt into English. This is a creative video prompt, so try to maintain its descriptive and evocative tone.
IMPORTANT: If the Indonesian prompt contains a section for spoken narration or dialogue (often indicated by phrases like "Kalimat yang Diucapkan:", "Narasi:", "Dialog:", or text in quotes clearly intended as speech), this specific narration/dialogue text MUST remain in its original language (e.g., Indonesian) and should NOT be translated. Integrate it naturally into the English prompt, perhaps labeled as 'Spoken Narration:' or 'Dialogue:'.

Indonesian Prompt to Translate:
---
${enhancedIndonesianText}
---
`;
      const translationResponse: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: translationPrompt,
      });
      const translatedEnglishText = translationResponse.text;
      setGeneratedEnglishPrompt(translatedEnglishText);

    } catch (e: any) {
      console.error("Error generating prompt with Gemini:", e);
      setError(`Failed to generate prompt. ${e.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, [promptData]);

  const handleClearInputs = useCallback(() => {
    setPromptData(initialPromptState);
    setGeneratedIndonesianPrompt('');
    setGeneratedEnglishPrompt('');
    setError(null);
  }, []);

  const inputFieldsConfig: Array<{key: PromptElementKeyType, label: string, placeholder?: string, type?: 'text' | 'textarea' | 'select', rows?: number, tooltip?: string, options?: Array<{value: string, label: string}>}> = [
    { key: 'subject', label: 'Subjek', placeholder: 'Mis: Naga raksasa, Seorang detektif cyberpunk', type: 'text', tooltip: "Fokus utama dari video Anda." },
    { key: 'action', label: 'Aksi / Gerakan', placeholder: 'Mis: Terbang di atas kota, Memecahkan kasus misterius', type: 'text', tooltip: "Apa yang dilakukan subjek atau kejadian utama." },
    { key: 'expression', label: 'Ekspresi Wajah / Emosi', placeholder: 'Mis: Marah, Tertawa bahagia, Fokus intens', type: 'text', tooltip: "Ekspresi atau emosi yang ditampilkan subjek." },
    { key: 'setting', label: 'Tempat / Lokasi', placeholder: 'Mis: Hutan ajaib, Kota futuristik Neo-Kyoto', type: 'text', tooltip: "Latar belakang atau lokasi adegan." },
    { key: 'timeOfDay', label: 'Waktu', type: 'select', options: [
        { value: 'Pagi Hari (Bright Daylight)', label: 'Pagi Hari (Bright Daylight)' }, { value: 'Siang Hari (Midday Sun)', label: 'Siang Hari (Midday Sun)' },
        { value: 'Sore Hari (Golden Hour)', label: 'Sore Hari (Golden Hour)' }, { value: 'Senja (Twilight)', label: 'Senja (Twilight)' },
        { value: 'Malam Hari (Dark Night)', label: 'Malam Hari (Dark Night)' }, { value: 'Matahari Terbit (Sunrise)', label: 'Matahari Terbit (Sunrise)' },
        { value: 'Matahari Terbenam (Sunset)', label: 'Matahari Terbenam (Sunset)' }, { value: 'Blue Hour', label: 'Blue Hour' }
      ], tooltip: "Waktu dalam sehari untuk adegan." },
    { key: 'cameraMovement', label: 'Gerakan Kamera', type: 'select', options: [
        { value: 'Static Shot', label: 'Static Shot (Pengambilan Statis)' }, { value: 'Panning', label: 'Panning (Geser Horizontal)' },
        { value: 'Tilting', label: 'Tilting (Geser Vertikal)' }, { value: 'Zoom In', label: 'Zoom In (Perbesar)' },
        { value: 'Zoom Out', label: 'Zoom Out (Perkecil)' }, { value: 'Dolly Shot', label: 'Dolly Shot (Gerakan Maju/Mundur)' },
        { value: 'Tracking Shot', label: 'Tracking Shot (Mengikuti Objek)' }, { value: 'Crane Shot', label: 'Crane Shot (Pengambilan dari Atas)' },
        { value: 'Handheld Shot', label: 'Handheld Shot (Gaya Genggam)'},
        { value: '3D Rotation', label: '3D Rotation (Rotasi 3D)' }, { value: 'Horizontal Rotation', label: 'Horizontal Rotation (Rotasi Horizontal)' },
        { value: 'Vertical Rotation', label: 'Vertical Rotation (Rotasi Vertikal)' }, { value: 'Roll Rotation', label: 'Roll Rotation (Rotasi Putar)' },
        { value: 'Zoom (Higgsfield)', label: 'Zoom (Perbesar/Perkecil Cepat Higgsfield)' }, { value: 'Horizontal Shift', label: 'Horizontal Shift (Geser Horizontal Cepat)' },
        { value: 'Vertical Shift', label: 'Vertical Shift (Geser Vertikal Cepat)' }, { value: 'Perspective Shift', label: 'Perspective Shift (Pergeseran Perspektif)' },
        { value: 'Wobble', label: 'Wobble (Goyangan)' }, { value: 'Jitter', label: 'Jitter (Getaran)' },
        { value: 'Pendulum', label: 'Pendulum (Bandul)' }, { value: 'Wave', label: 'Wave (Gelombang)' },
        { value: 'Spiral', label: 'Spiral (Spiral)' }, { value: 'Boomerang', label: 'Boomerang (Bumerang)' },
        { value: 'Pulse', label: 'Pulse (Denyut)' }, { value: 'Warp Speed', label: 'Warp Speed (Kecepatan Warp)' },
        { value: 'Vortex', label: 'Vortex (Pusaran)' }, { value: 'Twirl', label: 'Twirl (Puntiran)' },
        { value: 'Focus Pull', label: 'Focus Pull (Perpindahan Fokus)' }, { value: 'Vibrating', label: 'Vibrating (Bergetar)' },
        { value: 'Camera Shake', label: 'Camera Shake (Guncangan Kamera)' }, { value: 'Dolly Zoom / Vertigo Effect', label: 'Dolly Zoom / Vertigo Effect' }
      ], tooltip: "Bagaimana kamera bergerak atau diposisikan." },
    { key: 'lighting', label: 'Pencahayaan', type: 'select', options: [
        { value: 'Natural Light', label: 'Natural Light (Cahaya Alami)' }, { value: 'Studio Light', label: 'Studio Light (Cahaya Studio)' },
        { value: 'Golden Hour', label: 'Golden Hour (Jam Emas)' }, { value: 'Blue Hour', label: 'Blue Hour (Jam Biru)' },
        { value: 'High Key', label: 'High Key (Pencahayaan Terang)' }, { value: 'Low Key', label: 'Low Key (Pencahayaan Gelap)' },
        { value: 'Backlight', label: 'Backlight (Cahaya Belakang)' }, { value: 'Silhouette', label: 'Silhouette (Siluet)' },
        { value: 'Volumetric Lighting', label: 'Volumetric Lighting (Pencahayaan Volumetrik)' }, { value: 'Rim Lighting', label: 'Rim Lighting (Cahaya Tepi)'},
        { value: 'Neon Glow', label: 'Neon Glow (Sinar Neon)' }, { value: 'Dramatic Shadows', label: 'Dramatic Shadows (Bayangan Dramatis)' }
      ], tooltip: "Jenis dan gaya pencahayaan." },
    { key: 'videoStyle', label: 'Gaya Video', type: 'select', options: [
        { value: 'Cinematic', label: 'Cinematic (Sinematik)' }, { value: 'Photorealistic', label: 'Photorealistic (Fotorealistik)' },
        { value: 'Documentary', label: 'Documentary (Dokumenter)' }, { value: 'Vlog Style', label: 'Vlog Style (Gaya Vlog)' },
        { value: 'Music Video', label: 'Music Video (Video Musik)' }, { value: 'Animated (General)', label: 'Animated (Animasi Umum)' },
        { value: 'Anime Style', label: 'Anime Style (Gaya Anime)' }, { value: 'Claymation', label: 'Claymation (Animasi Tanah Liat)'},
        { value: 'Stop Motion', label: 'Stop Motion (Stop Motion)' }, { value: 'Vintage Film ( grainy, 8mm, 16mm )', label: 'Vintage Film (Film Jadul, grainy, 8mm, 16mm)' },
        { value: 'Futuristic / Sci-Fi', label: 'Futuristic / Sci-Fi (Futuristik / Fiksi Ilmiah)' }, { value: 'Cyberpunk', label: 'Cyberpunk' },
        { value: 'Steampunk', label: 'Steampunk' }, { value: 'Impressionist Painting Style', label: 'Impressionist Painting Style (Gaya Lukisan Impresionis)' },
        { value: 'Abstract', label: 'Abstract (Abstrak)' }, { value: 'Surreal', label: 'Surreal (Surealis)'}, { value: 'Horror', label: 'Horror (Horor)'}
      ], tooltip: "Estetika visual atau genre video." },
    { key: 'videoMood', label: 'Suasana Video', type: 'select', options: [
        { value: 'Happy / Joyful', label: 'Happy / Joyful (Senang / Gembira)' }, { value: 'Sad / Melancholic', label: 'Sad / Melancholic (Sedih / Melankolis)' },
        { value: 'Energetic / Exciting', label: 'Energetic / Exciting (Energik / Seru)' }, { value: 'Calm / Peaceful', label: 'Calm / Peaceful (Tenang / Damai)' },
        { value: 'Mysterious / Eerie', label: 'Mysterious / Eerie (Misterius / Seram)' }, { value: 'Romantic', label: 'Romantic (Romantis)' },
        { value: 'Suspenseful / Tense', label: 'Suspenseful / Tense (Mencekam / Tegang)' }, { value: 'Epic / Grandiose', label: 'Epic / Grandiose (Epik / Megah)' },
        { value: 'Humorous / Playful', label: 'Humorous / Playful (Lucu / Jenaka)' }, { value: 'Nostalgic', label: 'Nostalgic (Nostalgia)' },
        { value: 'Ominous / Foreboding', label: 'Ominous / Foreboding (Mengancam / Pertanda Buruk)' }, { value: 'Dreamy', label: 'Dreamy (Seperti Mimpi)'}
      ], tooltip: "Atmosfer emosional atau nuansa video." },
    { key: 'soundMusic', label: 'Suara / Musik', placeholder: 'Mis: Musik orkestra epik, Suara hujan dan petir, Hening', type: 'textarea', rows: 2, tooltip: "Deskripsi elemen audio, musik, atau efek suara." },
    { key: 'spokenNarration', label: 'Kalimat yang Diucapkan / Narasi', placeholder: 'Mis: "Dahulu kala...", Dialog antar karakter', type: 'textarea', rows: 2, tooltip: "Teks yang akan diucapkan atau narasi. Akan dipertahankan dalam bahasa asli." },
    { key: 'additionalDetails', label: 'Detail Tambahan', placeholder: 'Mis: Warna dominan biru, Tekstur kasar, Efek slow motion', type: 'textarea', rows: 3, tooltip: "Elemen spesifik lainnya, warna, tekstur, atau efek khusus." },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-pink-400 flex items-center justify-center">
            <SparklesIcon className="w-10 h-10 mr-3 text-pink-500" />
            Veo 3 Prompt Generator by IGO FIRNANDES
          </h1>
          <p className="mt-2 text-gray-300">
            Buat prompt video yang detail dan kreatif untuk model Veo 3 dengan bantuan AI.
          </p>
        </header>

        <main className="bg-gray-900 shadow-2xl rounded-lg p-6 sm:p-8">
          {!API_KEY && (
            <div className="mb-4 p-4 bg-red-800 border border-red-700 rounded-md text-center text-red-200">
              <strong>Peringatan:</strong> API Key untuk Gemini tidak ditemukan. Fungsi pembuatan prompt tidak akan bekerja. Mohon konfigurasikan environment variable API_KEY.
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); handleGeneratePrompt(); }}>
            {inputFieldsConfig.map(field => {
              if (field.type === 'select' && field.options) {
                return (
                  <SelectField
                    key={field.key}
                    id={field.key}
                    name={field.key}
                    label={field.label}
                    value={promptData[field.key]}
                    onChange={handleInputChange}
                    options={field.options}
                    labelTooltip={field.tooltip}
                  />
                );
              }
              return (
                 <InputField
                    key={field.key}
                    id={field.key}
                    name={field.key}
                    label={field.label}
                    value={promptData[field.key]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    type={field.type as 'text' | 'textarea'}
                    rows={field.rows}
                    labelTooltip={field.tooltip}
                  />
              );
            })}

            <div className="mt-8 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <Button onClick={handleClearInputs} variant="secondary" className="w-full sm:w-auto" disabled={isLoading}>
                <TrashIcon className="w-5 h-5 mr-2" />
                Bersihkan Semua
              </Button>
              <Button type="submit" variant="primary" className="w-full sm:w-auto" disabled={isLoading || !API_KEY}>
                {isLoading ? (
                  <span className="loading-spinner mr-2"></span>
                ) : (
                  <SparklesIcon className="w-5 h-5 mr-2" />
                )}
                {isLoading ? 'Memproses...' : 'Buat Prompt (AI)'}
              </Button>
            </div>
          </form>

          {error && (
            <div className="mt-6 p-3 bg-red-700 border border-red-600 rounded-md text-red-100 text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}

          <GeneratedPromptDisplay 
            indonesianPrompt={generatedIndonesianPrompt}
            englishPrompt={generatedEnglishPrompt}
            onIndonesianPromptChange={handleIndonesianPromptChange}
            isLoading={isLoading}
          />
        </main>
        
        <footer className="mt-12 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Veo 3 Prompt Generator by IGO FIRNANDES. Kembangkan kreasi AI Anda.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
import { metadata, MINI_APP_NEW_URL } from './metadata.config';

export { metadata };

export default function Page() {
  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto">
        <iframe 
          src={MINI_APP_NEW_URL}
          className="w-full h-[600px] border-none"
          frameBorder="0"
        />
      </div>
    </main>
  );
}
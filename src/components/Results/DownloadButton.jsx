import { useState } from 'react';
import { toPng } from 'html-to-image';
import { Button } from '../shared/Button.jsx';

export function DownloadButton({ captureRef }) {
  const [status, setStatus] = useState('idle'); // idle | generating | error

  async function handleDownload() {
    if (!captureRef.current) return;
    setStatus('generating');
    try {
      const dataUrl = await toPng(captureRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#E8590C',
      });
      const link = document.createElement('a');
      link.download = 'nbaRanker-top25.png';
      link.href = dataUrl;
      link.click();
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={handleDownload} disabled={status === 'generating'}>
        {status === 'generating' ? 'Generating Image…' : 'Download Image'}
      </Button>
      {status === 'error' && (
        <p role="status" className="text-sm font-semibold text-navy">
          Couldn&apos;t generate the image. Try again.
        </p>
      )}
    </div>
  );
}

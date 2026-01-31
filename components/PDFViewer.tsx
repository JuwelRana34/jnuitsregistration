"use client";

import { useState, useEffect, useRef } from 'react'; // ১. এই হুকগুলো ইমপোর্ট করুন
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ pdfUrl }: { pdfUrl: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  
  // ২. কন্টেইনারের সাইজ মাপার জন্য স্টেট এবং ref
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // ৩. স্ক্রিন রিসাইজ হলে অটোমেটিক উইথ আপডেট করার লজিক
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        // কন্টেইনারের বর্তমান উইথ সেট করছি
        // একটু প্যাডিং (যেমন 32px) বাদ দিচ্ছি যাতে স্ক্রলবার না আসে
        setContainerWidth(entry.contentRect.width); 
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div 
      className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-xl border min-h-125" 
      onContextMenu={(e) => e.preventDefault()}
    >
      
      {/* ৪. এখানে ref বসালাম যাতে এই div এর সাইজ মাপা যায় */}
      <div ref={containerRef} className="w-full max-w-150"> {/* max-w দিয়ে ল্যাপটপে লিমিট রাখা হলো */}
        
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
              <div className="flex flex-col items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
                  <p className="text-gray-500">Loading PDF...</p>
              </div>
          }
          className="shadow-2xl rounded-lg overflow-hidden border border-gray-200 bg-white"
        >
          <Page 
            pageNumber={pageNumber} 
            renderTextLayer={false}
            renderAnnotationLayer={false}
            // ৫. ফিক্সড 500 এর বদলে ডায়নামিক containerWidth বসালাম
            // লোড হওয়ার আগে ডিফল্ট ভ্যালু হিসেবে containerWidth না পেলে 300 রাখা হলো
            width={containerWidth ? containerWidth : 300} 
            className="h-auto"
          />
        </Document>

      </div>

      {/* Control Buttons */}
      {!loading && numPages > 0 && (
        <div className="flex items-center gap-4 mt-6 bg-white px-6 py-2 rounded-full shadow-sm border">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <span className="text-sm font-medium text-gray-600">
            Page <span className="text-black font-bold">{pageNumber}</span> of {numPages}
          </span>

          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
}
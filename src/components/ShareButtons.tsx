import { Button } from "@/components/ui/button";
import { Share2, Copy, Twitter, Linkedin, Rss } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { downloadRSSFeed } from "@/lib/rss";

interface ShareButtonsProps {
  title: string;
  url?: string;
  excerpt?: string;
  showRSS?: boolean;
}

export const ShareButtons = ({ 
  title, 
  url = window.location.href, 
  excerpt = "",
  showRSS = false 
}: ShareButtonsProps) => {
  const [showButtons, setShowButtons] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy link to clipboard.",
        variant: "destructive",
      });
    }
    setShowButtons(false);
  };

  const shareToTwitter = () => {
    const text = `${title} ${url}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    setShowButtons(false);
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank');
    setShowButtons(false);
  };

  const handleRSSDownload = () => {
    downloadRSSFeed();
    toast({
      title: "RSS Feed Downloaded!",
      description: "The RSS feed has been downloaded to your device.",
    });
    setShowButtons(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowButtons(!showButtons)}
        className="hover:scale-105 transition-transform duration-200"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
      
      {showButtons && (
        <div className="absolute top-full right-0 mt-2 bg-background border border-border rounded-lg shadow-lg p-2 z-50 animate-fade-in">
          <div className="flex flex-col gap-1 min-w-[140px]">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="justify-start hover:bg-muted"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={shareToTwitter}
              className="justify-start hover:bg-muted"
            >
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={shareToLinkedIn}
              className="justify-start hover:bg-muted"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>
            {showRSS && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRSSDownload}
                className="justify-start hover:bg-muted"
              >
                <Rss className="w-4 h-4 mr-2" />
                RSS Feed
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
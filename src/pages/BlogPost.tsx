import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getBlogPost } from "@/lib/blog";

const BlogPost = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const post = getBlogPost(slug || "");

  if (!post) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-6 py-16 max-w-2xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/blog")}
            className="mb-8 -ml-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-semibold text-foreground mb-4">Post Not Found</h1>
          <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-16 max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/blog")}
          className="mb-8 -ml-3"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <article>
          <header className="mb-12">
            <h1 className="text-3xl font-semibold text-foreground mb-4 leading-tight">{post.title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>
          
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
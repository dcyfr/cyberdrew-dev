import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";

interface BlogBreadcrumbProps {
  postTitle?: string;
  currentPage?: string;
}

export const BlogBreadcrumb = ({ postTitle, currentPage }: BlogBreadcrumbProps) => {
  const navigate = useNavigate();

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink 
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-foreground"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {postTitle ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink 
                onClick={() => navigate("/blog")}
                className="cursor-pointer hover:text-foreground"
              >
                Blog
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground font-medium">
                {postTitle}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : currentPage ? (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-foreground font-medium">
              {currentPage}
            </BreadcrumbPage>
          </BreadcrumbItem>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
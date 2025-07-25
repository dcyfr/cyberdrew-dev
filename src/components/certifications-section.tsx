import { Badge } from "@/components/ui/badge";
import { certifications } from "@/data/resume-data";

export const CertificationsSection = () => {
  return (
    <section className="mb-16 bg-accent-yellow/5 rounded-lg p-6 border border-accent-yellow/20">
      <h2 className="text-xl font-medium text-foreground mb-8">Certifications</h2>
      <div className="space-y-6">
        {certifications.map((org, index) => (
          <div key={index} className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">{org.organization}</h3>
            <div className="flex flex-wrap gap-2">
              {org.certs.map((cert, certIndex) => (
                <Badge key={certIndex} variant="outline" className="text-xs">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
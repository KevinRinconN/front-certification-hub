// import { useAuthStore } from "@/stores/auth/auth.store";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IndividualCertificate } from "./partials/certificate/individual-certificate";
import { MasiveExcelCertificate } from "./partials/certificate/masive-excel-certificate";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <div className="md:p-10 flex flex-col gap-4 items-center justify-between">
      <div className="mx-auto space-y-6 max-w-6xl w-full">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Certificar</h2>
          <p className="text-muted-foreground">
            Crea certificados de forma individual o masiva por medio de excel
          </p>
        </div>
        <Separator className="my-6" />
        <Tabs defaultValue="account">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="account">Individual</TabsTrigger>
              <TabsTrigger value="password">Excel</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="account">
            <IndividualCertificate />
          </TabsContent>
          <TabsContent value="password">
            <MasiveExcelCertificate />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

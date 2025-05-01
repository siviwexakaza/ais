export const dynamic = "force-dynamic";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ManagePartDialog } from "./_components/manage-part-dialog";
import { PartsTable } from "./_components/parts-table";
import { getParts } from "@/actions/part/actions";
import { ManagePartCategoryDialog } from "./_components/manage-part-category-dialog";
import { getCategories } from "@/actions/category/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
export default async function Page() {
  const parts = await getParts();
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Parts</h1>
      <p className="text-sm text-gray-500">
        Manage your parts all in one place
      </p>

      <Tabs defaultValue="parts">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="parts">Parts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="parts">
          <div className="flex justify-end mb-4">
            <ManagePartDialog />
          </div>
          <PartsTable parts={parts} />
        </TabsContent>

        <TabsContent value="categories">
          <div className="flex justify-end mb-4">
            <ManagePartCategoryDialog />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Part Categories</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-2">
                {categories.map((cat, i) => {
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div className="rounded-xl overflow-hidden shadow p-4">
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          width={200}
                          height={200}
                          className="object-cover"
                        />
                      </div>
                      <p className="mt-2 text-sm text-center text-gray-700 font-medium">
                        {cat.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

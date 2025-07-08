"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { UserFloodReport } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useState } from "react";
import { Upload } from "lucide-react";

const reportSchema = z.object({
  location: z.string().min(5, "Location is too short").max(100, "Location is too long"),
  description: z.string().min(10, "Description is too short").max(500, "Description is too long"),
  image: z.any().optional(),
});

type ReportFormValues = z.infer<typeof reportSchema>;

interface ReportFormProps {
  addReport: (report: Omit<UserFloodReport, "id" | "time">) => void;
}

export default function ReportForm({ addReport }: ReportFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      location: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<ReportFormValues> = (data) => {
    // In a real app, you would handle image upload here and get a URL.
    // For this demo, we'll use the preview URL if available.
    addReport({
      location: data.location,
      description: data.description,
      imageUrl: imagePreview || "https://placehold.co/600x400.png",
      // Dummy coordinates for now. A real app would use Geolocation API.
      latitude: -6.2 + (Math.random() - 0.5) * 0.5,
      longitude: 106.8 + (Math.random() - 0.5) * 0.5,
    });
    toast({
      title: "Report Submitted!",
      description: "Thank you for your contribution.",
    });
    form.reset();
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit a Flood Report</CardTitle>
        <CardDescription>
          Help others by sharing information about floods in your area.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Jl. Sudirman, Jakarta Selatan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the flood situation (height, current, etc.)"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center justify-center w-full">
                       <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted/50">
                          {imagePreview ? (
                            <Image src={imagePreview} alt="Preview" layout="fill" objectFit="cover" className="rounded-lg" />
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                              <p className="text-xs text-muted-foreground">PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                          )}
                          <Input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                       </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

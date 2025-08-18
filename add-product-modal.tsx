import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCategories, useRegions } from "@/hooks/use-stats";
import { useCreateProduct, useCreateProductPrice } from "@/hooks/use-products";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

const productSchema = z.object({
  nameAr: z.string().min(1, "اسم المنتج بالعربية مطلوب"),
  nameEn: z.string().min(1, "Product name in English is required"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "الفئة مطلوبة"),
  imageUrl: z.string().url().optional().or(z.literal("")),
  regionId: z.string().min(1, "المنطقة مطلوبة"),
  price: z.string().min(1, "السعر مطلوب"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductModal({ open, onOpenChange }: AddProductModalProps) {
  const { t, language } = useI18n();
  const { toast } = useToast();
  const { data: categories = [] } = useCategories();
  const { data: regions = [] } = useRegions();
  const createProduct = useCreateProduct();
  const createProductPrice = useCreateProductPrice();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nameAr: "",
      nameEn: "",
      description: "",
      categoryId: "",
      imageUrl: "",
      regionId: "",
      price: "",
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      // Create product first
      const product = await createProduct.mutateAsync({
        nameAr: data.nameAr,
        nameEn: data.nameEn,
        description: data.description,
        categoryId: data.categoryId,
        imageUrl: data.imageUrl || undefined,
      });

      // Then create the price
      await createProductPrice.mutateAsync({
        productId: product.id,
        regionId: data.regionId,
        price: data.price,
      });

      toast({
        title: language === 'ar' ? "تم إضافة المنتج بنجاح" : "Product added successfully",
        description: language === 'ar' 
          ? "سيتم مراجعة المنتج والسعر من قبل المجتمع" 
          : "The product and price will be reviewed by the community",
      });

      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: language === 'ar' ? "خطأ في إضافة المنتج" : "Error adding product",
        description: language === 'ar' 
          ? "حدث خطأ أثناء إضافة المنتج، يرجى المحاولة مرة أخرى" 
          : "An error occurred while adding the product, please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle data-testid="add-product-modal-title">
            {t('modal.add.product.title')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="nameAr">
              {language === 'ar' ? 'اسم المنتج (عربي)' : 'Product Name (Arabic)'}
            </Label>
            <Input
              id="nameAr"
              {...form.register("nameAr")}
              placeholder={language === 'ar' ? "مثال: زيت الطبخ - 1 لتر" : "Example: Cooking Oil - 1L"}
              data-testid="product-name-ar-input"
            />
            {form.formState.errors.nameAr && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.nameAr.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="nameEn">
              {language === 'ar' ? 'اسم المنتج (إنجليزي)' : 'Product Name (English)'}
            </Label>
            <Input
              id="nameEn"
              {...form.register("nameEn")}
              placeholder="Example: Cooking Oil - 1L"
              data-testid="product-name-en-input"
            />
            {form.formState.errors.nameEn && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.nameEn.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">
              {language === 'ar' ? 'وصف المنتج (اختياري)' : 'Product Description (Optional)'}
            </Label>
            <Input
              id="description"
              {...form.register("description")}
              placeholder={language === 'ar' ? "وصف قصير للمنتج" : "Short product description"}
              data-testid="product-description-input"
            />
          </div>

          <div>
            <Label htmlFor="imageUrl">
              {language === 'ar' ? 'رابط الصورة (اختياري)' : 'Image URL (Optional)'}
            </Label>
            <Input
              id="imageUrl"
              {...form.register("imageUrl")}
              placeholder="https://example.com/image.jpg"
              data-testid="product-image-url-input"
            />
          </div>

          <div>
            <Label>{t('modal.category')}</Label>
            <Select value={form.watch("categoryId")} onValueChange={(value) => form.setValue("categoryId", value)}>
              <SelectTrigger data-testid="product-category-select">
                <SelectValue placeholder={language === 'ar' ? 'اختر الفئة' : 'Select Category'} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category: any) => (
                  <SelectItem key={category.id} value={category.id}>
                    {language === 'ar' ? category.nameAr : category.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.categoryId && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.categoryId.message}</p>
            )}
          </div>

          <div>
            <Label>{t('modal.region')}</Label>
            <Select value={form.watch("regionId")} onValueChange={(value) => form.setValue("regionId", value)}>
              <SelectTrigger data-testid="product-region-select">
                <SelectValue placeholder={language === 'ar' ? 'اختر المنطقة' : 'Select Region'} />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region: any) => (
                  <SelectItem key={region.id} value={region.id}>
                    {language === 'ar' ? region.nameAr : region.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.regionId && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.regionId.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="price">{t('modal.price')}</Label>
            <Input
              id="price"
              {...form.register("price")}
              placeholder="0.00"
              type="number"
              step="0.01"
              min="0"
              data-testid="product-price-input"
            />
            {form.formState.errors.price && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.price.message}</p>
            )}
          </div>

          <div className="flex space-x-3 space-x-reverse pt-4">
            <Button
              type="submit"
              className="flex-1"
              disabled={createProduct.isPending || createProductPrice.isPending}
              data-testid="submit-product-button"
            >
              {createProduct.isPending || createProductPrice.isPending 
                ? (language === 'ar' ? 'جاري الإضافة...' : 'Adding...') 
                : t('modal.add')
              }
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              data-testid="cancel-product-button"
            >
              {t('modal.cancel')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

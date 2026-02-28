"use client";
import { useEffect, useState } from "react";
import { Review } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Check, User } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";
import ReviewForm from "./review-form";
import { getReviews } from "@/lib/actions/review.actions";
import Rating from '@/components/shared/product/rating';
const ReviewList = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    /// Load reviews from the database
    const loadReviews = async () => {
      const res = await getReviews({ productId });
      setReviews(res.data);
    };

    loadReviews();
  }, [productId]);
  // Reload reviews when a review is submitted
// Reload reviews when a review is submitted
const reload = async () => {
  try {
    const res = await getReviews({ productId });
    setReviews([...res.data]);
  } catch (err) {
    console.log(err);
    toast.error('Error in fetching reviews', {
      style: {
        color: "red",
      },
    });
  }
};
  return (
    <div className="space-y-4">
      {reviews.length === 0 && <div>No reviews yet</div>}
      {userId ? (
        <>{/* REVIEW FORM HERE */}</>
      ) : (
        <div>
          Please
          <Link
            className="text-blue-600 px-2 underline "
            href={`/api/auth/signin?callbackUrl=/product/${productSlug}`}
          >
            sign in
          </Link>
          to write a review
        </div>
      )}
      <div className="flex flex-col gap-3">
        {/* REVIEWS HERE */}
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex-between">
                <CardTitle>{review.title}</CardTitle>
              </div>
              <CardDescription>{review.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                {/* RATING HERE */}
                <Rating value={review.rating} />
                <div className="flex items-center">
                  <User className="mr-1 h-3 w-3" />
                  {review.user ? review.user.name : "Deleted User"}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {formatDateTime(review.createdAt).dateTime}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <ReviewForm
          userId={userId}
          productId={productId}
          onReviewSubmitted={reload}
        />
      </div>
    </div>
  );
};

export default ReviewList;

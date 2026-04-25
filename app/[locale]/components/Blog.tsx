import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "../../lib/interface";
import { urlFor } from "../../lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

interface BlogProps {
  posts: simpleBlogCard[];
}

export function Blog({ posts }: BlogProps) {
  if (posts.length === 0) {
    return (
      <p className="mt-8 text-center text-muted-foreground">
        No hay publicaciones en esta página.
      </p>
    );
  }

  return (
    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
      {posts.map((post) => (
        <Card key={post.currentSlug}>
          <Image
            src={urlFor(post.titleImage).url()}
            alt={post.title}
            width={500}
            height={500}
            className="h-[200px] rounded-t-lg object-cover"
          />

          <CardContent className="mt-5">
            <h3 className="line-clamp-2 text-lg font-bold">{post.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
              {post.smallDescription}
            </p>
            <Button asChild className="mt-7 w-full">
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from "lucide-react";
import rawPosts from "@/content/blog.json";

interface BlogPostContent {
  type: string;
  text: string;
}

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  seoTitle?: string;
  seoDescription?: string;
  content: BlogPostContent[];
}

const posts = rawPosts as BlogPost[];

export default function BlogPostDetail() {
  const [, params] = useRoute("/blog/:slug");
  const currentSlug = params?.slug;

  const post = posts.find((p) => p.slug === currentSlug);

  // Fallback / 404 state if blog post isn't found
  if (!post) {
    return (
      <Layout title="Article Not Found | ER Marketers" description="The requested blog post could not be found.">
        <section className="py-32 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-extrabold mb-6 text-white">Article Not Found</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md">
            The article you are looking for does not exist or has been moved.
          </p>
          <Link href="/blog">
            <span className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </span>
          </Link>
        </section>
      </Layout>
    );
  }

  // Recommendations (exclude current post)
  const recommendations = posts
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  // SEO Fallbacks
  const seoTitle = post.seoTitle || `${post.title} | ER Marketers Blog`;
  const seoDescription = post.seoDescription || post.excerpt;
  const currentUrl = `https://ermarketers.in/blog/${post.slug}`; // Update with real domain eventually

  return (
    <Layout title={seoTitle} description={seoDescription}>
      {/* Inject custom, rich SEO headers for search engine parsing & social link previews */}
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />

        {/* Open Graph / Facebook / LinkedIn / WhatsApp */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={post.image} />
        <meta property="og:site_name" content="ER Marketers" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={post.image} />

        {/* Article Metadata (Schema.org / SEO) */}
        <meta name="author" content={post.author} />
        <meta property="article:published_time" content={new Date(post.date).toISOString()} />
        <meta property="article:section" content={post.category} />
      </Helmet>

      {/* Back Button & Top Meta */}
      <section className="pt-28 pb-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 cursor-pointer transition-colors group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Blog
            </span>
          </Link>

          <Reveal>
            <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full mb-6 inline-block">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-8 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary font-semibold text-xs border border-white/10">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-white/80 font-medium">{post.author}</span>
              </div>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Post Image */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal delay={100}>
            <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Post Content */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Reveal delay={150}>
            <article className="space-y-8 text-white/80 text-lg leading-relaxed">
              {post.content.map((block, i) => {
                if (block.type === "heading") {
                  return (
                    <h2 key={i} className="text-2xl sm:text-3xl font-bold text-white pt-6 mb-4">
                      {block.text}
                    </h2>
                  );
                }
                return (
                  <p key={i} className="text-white/70">
                    {block.text}
                  </p>
                );
              })}
            </article>
          </Reveal>
        </div>
      </section>

      {/* Recommendations / Next Read */}
      {recommendations.length > 0 && (
        <section className="py-16 border-t border-white/10 bg-card/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h3 className="text-2xl font-bold text-white mb-10 text-center sm:text-left">Recommended Reads</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {recommendations.map((recPost, i) => (
                <Reveal key={recPost.id} delay={100 + i * 100}>
                  <Link href={`/blog/${recPost.slug}`}>
                    <div className="group glass-panel rounded-2xl overflow-hidden flex flex-col h-full hover:border-primary/20 hover:cursor-pointer transition-all duration-300">
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img
                          src={recPost.image}
                          alt={recPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-primary font-semibold text-xs px-3 py-1 rounded-lg">
                          {recPost.category}
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <h4 className="text-lg font-bold mb-3 line-clamp-2 text-white group-hover:text-primary transition-colors">
                          {recPost.title}
                        </h4>
                        <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-2">
                          {recPost.excerpt}
                        </p>
                        <span className="flex items-center gap-0.5 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform mt-auto">
                          Read Article <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </Layout>
  );
}

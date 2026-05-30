import { useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { Search, Calendar, Clock, User, ArrowRight } from "lucide-react";
import rawPosts from "@/content/blog.json";

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
  featured?: boolean;
}

const posts = rawPosts as BlogPost[];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Paid Media", "SEO", "AI Content", "CRO"];

  // Filtering Logic
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.find((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured || selectedCategory !== "All" || searchQuery !== "");

  return (
    <Layout title="Insights & Growth Blog | ER Marketers" description="Read professional strategies and guides on paid media optimization, SEO architecture, conversion rate improvements, and AI content systems.">
      {/* Header section */}
      <section className="pt-24 pb-12 bg-card/20 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Growth <span className="text-gradient">Insights</span> & Strategy
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              We share actionable insights, scalable marketing workflows, proven growth tactics, and AI updates to help scale your business.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter and Search controls */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-16">
            {/* Category selection chips */}
            <Reveal delay={100} className="w-full md:w-auto">
              <div className="flex flex-wrap gap-2.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground shadow-[0_4px_16px_rgba(255,122,0,0.3)]"
                        : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Search Input Bar */}
            <Reveal delay={150} className="w-full md:w-80">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-card/40 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
            </Reveal>
          </div>

          {/* Featured Post Card */}
          {selectedCategory === "All" && searchQuery === "" && featuredPost && (
            <Reveal delay={200} className="mb-16">
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className="group relative rounded-3xl overflow-hidden glass-panel-strong border border-white/10 p-6 md:p-8 flex flex-col lg:flex-row gap-8 hover:border-primary/20 hover:cursor-pointer transition-all duration-300">
                  <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Featured Post Thumbnail */}
                  <div className="w-full lg:w-1/2 aspect-[16/10] lg:aspect-auto lg:h-[360px] rounded-2xl overflow-hidden relative">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground font-bold text-xs px-3.5 py-1.5 rounded-lg uppercase tracking-wide">
                      Featured
                    </div>
                  </div>

                  {/* Featured Post Details */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="text-primary font-bold uppercase tracking-wider">{featuredPost.category}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{featuredPost.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featuredPost.readTime}</span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 group-hover:text-primary transition-colors text-white leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground text-base leading-relaxed mb-6 flex-1">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary font-semibold text-xs border border-white/10">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-medium text-white/80">{featuredPost.author}</span>
                      </div>
                      <span className="flex items-center gap-1 text-sm font-bold text-primary group-hover:translate-x-1.5 transition-transform">
                        Read Article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <Reveal key={post.id} delay={100 + index * 50}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="group glass-panel rounded-2xl overflow-hidden flex flex-col h-full hover:border-primary/20 hover:cursor-pointer transition-all duration-300">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-primary font-semibold text-xs px-3 py-1 rounded-lg">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                      </div>

                      <h3 className="text-xl font-bold mb-3 line-clamp-2 text-white group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-primary font-semibold text-[10px] border border-white/10">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-medium text-white/80">{post.author}</span>
                        </div>
                        <span className="flex items-center gap-0.5 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                          Read More <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-24 text-muted-foreground glass-panel rounded-2xl p-10 max-w-xl mx-auto border-white/10">
              <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No Articles Found</h3>
              <p className="text-sm">We couldn't find any articles matching your filters or search keywords. Please adjust your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}

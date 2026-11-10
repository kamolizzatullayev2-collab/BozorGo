"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search, ShoppingCart, Menu, X, Heart, Star, ArrowRight, ChevronRight,
  SlidersHorizontal, Plus, Minus, Trash2, Store, LayoutDashboard, Package,
  UserRound, BadgeCheck, Truck, ShieldCheck, Headphones, Sofa, Refrigerator,
  CookingPot, Grid2X2, Sparkles, Check, UploadCloud, CircleUserRound
} from "lucide-react";

type Product = {
  id: number; name: string; category: string; price: number; oldPrice?: number;
  rating: number; reviews: number; image: string; badge?: string; store: string;
};
type CartItem = { product: Product; qty: number };

const initialProducts: Product[] = [
  { id:1, name:"Minimalist yumshoq divan", category:"Mebel", price:4290000, oldPrice:5200000, rating:4.9, reviews:124, image:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", badge:"−18%", store:"Makon Home" },
  { id:2, name:"Zamonaviy ovqatlanish stoli", category:"Mebel", price:1890000, oldPrice:2250000, rating:4.8, reviews:86, image:"https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800", badge:"−16%", store:"Makon Home" },
  { id:3, name:"Ikki eshikli muzlatkich", category:"Maishiy texnika", price:5890000, oldPrice:6490000, rating:4.7, reviews:203, image:"https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800", badge:"−9%", store:"Tech House" },
  { id:4, name:"Aqlli changyutgich", category:"Maishiy texnika", price:1290000, rating:4.8, reviews:67, image:"https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800", badge:"Yangi", store:"Tech House" },
  { id:5, name:"Elektr choynak 1.7L", category:"Oshxona jihozlari", price:289000, oldPrice:359000, rating:4.6, reviews:91, image:"https://images.unsplash.com/photo-1608354580875-30bd4168b351?w=800", badge:"−20%", store:"Uy-Ro‘zg‘or" },
  { id:6, name:"Qahva tayyorlagich", category:"Oshxona jihozlari", price:849000, rating:4.9, reviews:42, image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800", store:"Uy-Ro‘zg‘or" },
  { id:7, name:"Skandinaviya uslubidagi kreslo", category:"Mebel", price:1590000, oldPrice:1790000, rating:4.8, reviews:58, image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800", badge:"−11%", store:"Makon Home" },
  { id:8, name:"Blender to‘plami", category:"Oshxona jihozlari", price:479000, oldPrice:550000, rating:4.7, reviews:39, image:"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800", badge:"−13%", store:"Uy-Ro‘zg‘or" }
];
const categories = ["Barchasi", "Mebel", "Maishiy texnika", "Oshxona jihozlari"];
const money = (n:number) => new Intl.NumberFormat("uz-UZ").format(n) + " so‘m";

export default function Home() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Barchasi");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [liked, setLiked] = useState<number[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [page, setPage] = useState<"home"|"seller"|"admin">("home");
  const [sort, setSort] = useState("popular");
  const [sellerName, setSellerName] = useState("");
  const [sellerProduct, setSellerProduct] = useState("");
  const [sellerPrice, setSellerPrice] = useState("");
  const [sellerCategory, setSellerCategory] = useState("Mebel");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("MebelTech-cart");
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);
  useEffect(() => { try { localStorage.setItem("MebelTech-cart", JSON.stringify(cart)); } catch {} }, [cart]);

  const filtered = useMemo(() => {
    let list = products.filter(p => (category === "Barchasi" || p.category === category) &&
      p.name.toLocaleLowerCase("uz").includes(query.toLocaleLowerCase("uz")));
    if (sort === "cheap") list = [...list].sort((a,b)=>a.price-b.price);
    if (sort === "expensive") list = [...list].sort((a,b)=>b.price-a.price);
    if (sort === "rating") list = [...list].sort((a,b)=>b.rating-a.rating);
    return list;
  }, [products, category, query, sort]);
  const count = cart.reduce((n,item)=>n+item.qty,0);
  const total = cart.reduce((n,item)=>n+item.product.price*item.qty,0);

  function add(p:Product) {
    setCart(old => old.some(i=>i.product.id===p.id)
      ? old.map(i=>i.product.id===p.id?{...i,qty:i.qty+1}:i)
      : [...old,{product:p,qty:1}]);
    setNotice("Mahsulot savatga qo‘shildi");
    setTimeout(()=>setNotice(""),2200);
  }
  function changeQty(id:number, delta:number) {
    setCart(old=>old.map(i=>i.product.id===id?{...i,qty:i.qty+delta}:i).filter(i=>i.qty>0));
  }
  function submitListing(e:React.FormEvent) {
    e.preventDefault();
    if (!sellerName.trim() || !sellerProduct.trim() || Number(sellerPrice)<=0) return;
    const p:Product = { id:Date.now(), name:sellerProduct, category:sellerCategory, price:Number(sellerPrice), rating:5, reviews:0, image:"https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800", badge:"Yangi", store:sellerName };
    setProducts(old=>[p,...old]); setSellerProduct(""); setSellerPrice("");
    setNotice("Mahsulot katalogga joylandi!"); setTimeout(()=>setNotice(""),2500); setPage("home");
  }

  return (
    <main className="min-h-screen">
      <div className="bg-navy text-white text-xs"><div className="container flex items-center justify-between py-2"><span>🎉 Birinchi buyurtmangizga 10% chegirma — GO10</span><span className="hidden sm:block text-white/70">Yetkazib berish: O‘zbekiston bo‘ylab</span></div></div>
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="container flex h-[76px] items-center gap-5">
          <button className="md:hidden rounded-xl p-2 hover:bg-slate-100" onClick={()=>setDrawer(!drawer)} aria-label="Menyu"><Menu size={22}/></button>
          <button onClick={()=>{setPage("home");window.scrollTo({top:0,behavior:"smooth"});}} className="shrink-0 text-left">
            <div className="text-[27px] font-black tracking-tight text-navy">Mebel<span className="text-orange">Tech</span><span className="ml-1 inline-block h-2 w-2 rounded-full bg-orange"/></div>
            <div className="-mt-1 text-[10px] tracking-wide text-slate-500">Har narsa bir joyda.</div>
          </button>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 lg:flex">
            <button onClick={()=>setPage("home")} className="hover:text-orange">Bosh sahifa</button>
            <a href="#catalog" className="hover:text-orange">Katalog</a>
            <a href="#stores" className="hover:text-orange">Do‘konlar</a>
            <button onClick={()=>setPage("seller")} className="hover:text-orange">Sotuvchi bo‘lish</button>
          </nav>
          <div className="relative ml-auto hidden max-w-[410px] flex-1 md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
            <input value={query} onChange={e=>{setQuery(e.target.value);setPage("home");}} placeholder="Nima izlayapsiz?" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-orange focus:bg-white"/>
          </div>
          <button onClick={()=>setLiked([])} className="hidden rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 sm:block" title="Saralanganlar"><Heart size={21}/></button>
          <button onClick={()=>setDrawer(true)} className="relative rounded-2xl bg-orange px-4 py-3 text-white shadow-lg shadow-orange/20 transition hover:bg-orange-600">
            <span className="flex items-center gap-2"><ShoppingCart size={19}/><span className="hidden text-sm font-bold sm:inline">Savat</span></span>
            {count>0&&<span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-navy px-1 text-[10px] font-bold">{count}</span>}
          </button>
        </div>
        {drawer && <div className="container pb-3 md:hidden"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Mahsulot qidirish..." className="w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none focus:border-orange"/></div><div className="mt-3 flex gap-4 text-sm font-semibold"><button onClick={()=>{setPage("home");setDrawer(false)}}>Bosh sahifa</button><a href="#catalog" onClick={()=>setDrawer(false)}>Katalog</a><a href="#stores" onClick={()=>setDrawer(false)}>Do‘konlar</a><button onClick={()=>{setPage("seller");setDrawer(false)}}>Sotuvchi bo‘lish</button></div></div>}
      </header>

      {page==="home" ? <>
        <section className="container pt-7 md:pt-10">
          <div className="relative isolate overflow-hidden rounded-[30px] bg-navy px-6 py-10 text-white md:px-14 md:py-16">
            <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-orange/20 blur-2xl"/>
            <div className="absolute -bottom-36 right-[25%] h-72 w-72 rounded-full border-[42px] border-white/5"/>
            <div className="relative max-w-[570px]">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-orange-200"><Sparkles size={14}/> Qulay xaridlar shu yerdan boshlanadi</div>
              <h1 className="text-4xl font-black leading-[1.08] tracking-tight md:text-6xl">Uyingiz uchun <span className="text-orange">eng yaxshisi</span> — bir joyda.</h1>
              <p className="mt-5 max-w-md text-sm leading-6 text-slate-300 md:text-base">Mebel, maishiy texnika va oshxona jihozlarini ishonchli do‘konlardan qulay narxlarda toping.</p>
              <div className="mt-8 flex flex-wrap gap-3"><a href="#catalog" className="inline-flex items-center gap-2 rounded-xl bg-orange px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange/20 hover:bg-orange-600">Xaridni boshlash <ArrowRight size={17}/></a><a href="#stores" className="rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold hover:bg-white/10">Do‘konlarni ko‘rish</a></div>
              <div className="mt-9 flex gap-7 text-xs text-slate-300"><div><b className="block text-xl text-white">1 200+</b>Mahsulot</div><div><b className="block text-xl text-white">80+</b>Do‘kon</div><div><b className="block text-xl text-white">24/7</b>Buyurtma</div></div>
            </div>
            <div className="absolute -right-5 bottom-0 hidden h-full w-[46%] md:block"><div className="absolute right-8 top-10 h-[78%] w-[78%] overflow-hidden rounded-tl-[100px] rounded-br-[100px] border-[10px] border-white/10 shadow-2xl"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000" alt="Zamonaviy uy interyeri" className="h-full w-full object-cover"/></div><div className="absolute bottom-9 left-0 rounded-2xl bg-white p-4 text-navy shadow-xl"><div className="flex items-center gap-2 text-xs font-semibold"><span className="rounded-lg bg-orange/10 p-2 text-orange"><Truck size={19}/></span><span>Tez va ishonchli<br/>yetkazib berish</span></div></div></div>
          </div>
        </section>

        <section className="container py-10">
          <div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-orange">Bo‘limlar</p><h2 className="mt-1 text-2xl font-black md:text-3xl">Nimani izlayapsiz?</h2></div><a href="#catalog" className="hidden items-center gap-1 text-sm font-bold text-orange sm:flex">Barcha mahsulotlar <ChevronRight size={17}/></a></div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {name:"Mebel",desc:"Uyingizga qulaylik qo‘shing",icon:Sofa,number:"01",bg:"bg-[#FFF0E7]"},
              {name:"Maishiy texnika",desc:"Kundalik ishlar osonroq",icon:Refrigerator,number:"02",bg:"bg-[#EAF0FF]"},
              {name:"Oshxona jihozlari",desc:"Mazali lahzalar uchun",icon:CookingPot,number:"03",bg:"bg-[#EAF6EF]"}
            ].map(c=><button key={c.name} onClick={()=>{setCategory(c.name);document.getElementById("catalog")?.scrollIntoView({behavior:"smooth"});}} className={`${c.bg} group flex items-center justify-between rounded-2xl p-5 text-left transition hover:-translate-y-1 hover:shadow-soft md:p-6`}><div><span className="text-xs font-bold text-slate-400">{c.number} / KATEGORIYA</span><h3 className="mt-2 text-lg font-extrabold">{c.name}</h3><p className="mt-1 text-xs text-slate-500">{c.desc}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-navy">Ko‘rish <ArrowRight size={14}/></span></div><div className="rounded-2xl bg-white/80 p-4 text-navy shadow-sm transition group-hover:rotate-3"><c.icon size={34}/></div></button>)}
          </div>
        </section>

        <section id="catalog" className="bg-white py-10 md:py-14">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-orange">Tanlangan mahsulotlar</p><h2 className="mt-1 text-2xl font-black md:text-3xl">Siz uchun topilmalar</h2><p className="mt-2 text-sm text-slate-500">Sifatli mahsulotlar — hamyonbop narxlarda.</p></div><div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm"><SlidersHorizontal size={16} className="text-slate-500"/><select value={sort} onChange={e=>setSort(e.target.value)} className="bg-transparent font-semibold outline-none"><option value="popular">Ommabop</option><option value="cheap">Arzon narx</option><option value="expensive">Qimmat narx</option><option value="rating">Yuqori baho</option></select></div></div>
            <div className="soft-scroll mt-6 flex gap-2 overflow-x-auto pb-2">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition ${category===c?"bg-navy text-white shadow-md":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{c}</button>)}</div>
            <div className="mt-5 flex items-center justify-between text-xs text-slate-500"><span>{filtered.length} ta mahsulot topildi</span>{query&&<button onClick={()=>setQuery("")} className="font-bold text-orange">Qidiruvni tozalash ×</button>}</div>
            {filtered.length ? <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
              {filtered.map(p=><article key={p.id} className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-1 hover:shadow-soft">
                <div className="product-image relative aspect-[1.12] overflow-hidden"><img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>{p.badge&&<span className="absolute left-3 top-3 rounded-lg bg-orange px-2.5 py-1 text-[10px] font-extrabold text-white">{p.badge}</span>}<button onClick={()=>setLiked(old=>old.includes(p.id)?old.filter(x=>x!==p.id):[...old,p.id])} className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-500 shadow-sm hover:text-orange" aria-label="Saralanganlarga qo‘shish"><Heart size={16} fill={liked.includes(p.id)?"#ff7629":"none"} className={liked.includes(p.id)?"text-orange":""}/></button></div>
                <div className="p-3 md:p-4"><p className="truncate text-[10px] font-bold uppercase tracking-wide text-slate-400">{p.category}</p><h3 className="mt-1 min-h-[38px] text-sm font-bold leading-5 text-navy">{p.name}</h3><div className="mt-2 flex items-center gap-1 text-xs"><Star size={13} fill="#F5A623" className="text-amber-500"/><b>{p.rating}</b><span className="text-slate-400">({p.reviews})</span></div><div className="mt-3 flex flex-wrap items-baseline gap-2"><b className="text-sm text-navy md:text-base">{money(p.price)}</b>{p.oldPrice&&<span className="text-[10px] text-slate-400 line-through">{money(p.oldPrice)}</span>}</div><div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3"><span className="truncate text-[10px] text-slate-400">{p.store}</span><button onClick={()=>add(p)} className="flex shrink-0 items-center gap-1 rounded-xl bg-navy px-3 py-2 text-xs font-bold text-white transition hover:bg-orange"><Plus size={14}/> Savatga</button></div></div>
              </article>)}
            </div> : <div className="rounded-2xl bg-slate-50 py-16 text-center"><Search className="mx-auto text-slate-300" size={34}/><h3 className="mt-3 font-bold">Mahsulot topilmadi</h3><p className="mt-1 text-sm text-slate-500">Boshqa nom yoki bo‘limni sinab ko‘ring.</p><button onClick={()=>{setQuery("");setCategory("Barchasi")}} className="mt-4 text-sm font-bold text-orange">Filtrlarni tozalash</button></div>}
          </div>
        </section>

        <section id="stores" className="container py-12">
          <div className="flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-orange">Hamkorlarimiz</p><h2 className="mt-1 text-2xl font-black md:text-3xl">Ishonchli do‘konlar</h2><p className="mt-2 text-sm text-slate-500">Tekshirilgan sotuvchilardan xarid qiling.</p></div><button onClick={()=>setPage("seller")} className="hidden items-center gap-1 text-sm font-bold text-orange sm:flex">Do‘kon ochish <ArrowRight size={16}/></button></div>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[{name:"Makon Home",type:"Mebel va interyer",initial:"MH",color:"bg-orange/10 text-orange",items:"124 mahsulot",rating:"4.9"},{name:"Tech House",type:"Maishiy texnika",initial:"TH",color:"bg-blue-100 text-blue-700",items:"86 mahsulot",rating:"4.8"},{name:"Uy-Ro‘zg‘or",type:"Oshxona jihozlari",initial:"UR",color:"bg-emerald-100 text-emerald-700",items:"62 mahsulot",rating:"4.9"}].map(s=><div key={s.name} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"><div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${s.color}`}>{s.initial}</div><div className="min-w-0 flex-1"><h3 className="font-extrabold">{s.name}</h3><p className="mt-1 text-xs text-slate-500">{s.type}</p><div className="mt-2 flex gap-3 text-[10px] text-slate-400"><span>{s.items}</span><span className="flex items-center gap-1"><Star size={11} fill="#F5A623" className="text-amber-500"/>{s.rating}</span></div></div><BadgeCheck className="shrink-0 text-emerald-500" size={20}/></div>)}
          </div>
        </section>

        <section className="container pb-14"><div className="grid grid-cols-1 gap-3 rounded-3xl bg-orange px-6 py-8 text-white sm:grid-cols-[1fr_auto] sm:items-center sm:px-10"><div><h2 className="text-2xl font-black">BozorGo’da o‘z do‘koningizni oching!</h2><p className="mt-2 max-w-xl text-sm text-white/85">Mahsulotlaringizni minglab xaridorlarga taqdim eting. Ro‘yxatdan o‘tish bir necha daqiqa oladi.</p></div><button onClick={()=>setPage("seller")} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-orange hover:bg-orange-50 sm:mt-0">Sotuvchi bo‘lish <ArrowRight size={17}/></button></div></section>
      </> : page==="seller" ? <section className="container min-h-[70vh] py-10"><button onClick={()=>setPage("home")} className="mb-6 text-sm font-bold text-orange">← Bosh sahifaga qaytish</button><div className="mx-auto max-w-2xl rounded-3xl border border-slate-100 bg-white p-6 shadow-soft md:p-9"><div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange/10 text-orange"><Store size={28}/></div><p className="text-xs font-bold uppercase tracking-widest text-orange">Hamkorlik</p><h1 className="mt-2 text-3xl font-black">Sotuvchi bo‘lish</h1><p className="mt-2 text-sm leading-6 text-slate-500">Do‘koningizni tanishtiring va birinchi mahsulotingizni katalogga joylang. Bu demo shakl ma’lumotlarni faqat shu sahifada saqlaydi.</p><form onSubmit={submitListing} className="mt-8 space-y-5"><label className="block text-sm font-bold">Do‘kon nomi<input required value={sellerName} onChange={e=>setSellerName(e.target.value)} placeholder="Masalan: Baraka Market" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-orange"/></label><div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-bold">Mahsulot nomi<input required value={sellerProduct} onChange={e=>setSellerProduct(e.target.value)} placeholder="Mahsulot nomini kiriting" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-orange"/></label><label className="block text-sm font-bold">Narxi (so‘m)<input required type="number" min="1" value={sellerPrice} onChange={e=>setSellerPrice(e.target.value)} placeholder="250000" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-orange"/></label></div><label className="block text-sm font-bold">Kategoriya<select value={sellerCategory} onChange={e=>setSellerCategory(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-orange">{categories.slice(1).map(c=><option key={c}>{c}</option>)}</select></label><div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-500"><UploadCloud className="mx-auto mb-2 text-slate-400" size={25}/>Rasm yuklash — demo versiyada mavjud emas</div><button className="w-full rounded-xl bg-orange py-3.5 text-sm font-extrabold text-white hover:bg-orange-600">Mahsulotni joylash <ArrowRight className="ml-1 inline" size={16}/></button></form></div></section> :
      <section className="container min-h-[70vh] py-10"><button onClick={()=>setPage("home")} className="mb-6 text-sm font-bold text-orange">← Bosh sahifaga qaytish</button><div className="mb-7 flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-orange">Boshqaruv</p><h1 className="mt-1 text-3xl font-black">Admin paneli</h1><p className="mt-1 text-sm text-slate-500">MebelTech faoliyati bo‘yicha demo ko‘rsatkichlar.</p></div><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">● Tizim faol</span></div><div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{[{label:"Jami mahsulotlar",value:products.length,icon:Package},{label:"Hamkor do‘konlar",value:"3",icon:Store},{label:"Savatdagi mahsulot",value:count,icon:ShoppingCart},{label:"Saralanganlar",value:liked.length,icon:Heart}].map(x=><div key={x.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"><x.icon className="text-orange" size={22}/><p className="mt-4 text-2xl font-black">{x.value}</p><p className="mt-1 text-xs text-slate-500">{x.label}</p></div>)}</div><div className="mt-7 overflow-hidden rounded-2xl border border-slate-100 bg-white"><div className="border-b p-5"><h2 className="font-extrabold">Mahsulotlar boshqaruvi</h2><p className="mt-1 text-xs text-slate-500">Demo katalogdagi mahsulotlar</p></div><div className="divide-y">{products.map(p=><div key={p.id} className="flex items-center gap-3 p-4"><img src={p.image} className="h-12 w-12 rounded-xl object-cover" alt=""/><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{p.name}</p><p className="text-xs text-slate-400">{p.store} · {p.category}</p></div><b className="text-xs">{money(p.price)}</b></div>)}</div></div></section>}

      <footer className="bg-navy py-10 text-white"><div className="container"><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"><div><div className="text-2xl font-black">Bozor<span className="text-orange">Go</span></div><p className="mt-2 text-xs text-slate-400">Har narsa bir joyda.</p><p className="mt-4 max-w-xs text-xs leading-5 text-slate-400">Xarid qilishning qulay va zamonaviy manzili.</p></div><div><h3 className="text-sm font-bold">Xaridorlarga</h3><div className="mt-4 space-y-3 text-xs text-slate-400"><a className="block hover:text-white" href="#catalog">Katalog</a><a className="block hover:text-white" href="#stores">Do‘konlar</a><a className="block hover:text-white" href="#catalog">Chegirmalar</a></div></div><div><h3 className="text-sm font-bold">Hamkorlarga</h3><div className="mt-4 space-y-3 text-xs text-slate-400"><button className="block hover:text-white" onClick={()=>setPage("seller")}>Sotuvchi bo‘lish</button><button className="block hover:text-white" onClick={()=>setPage("admin")}>Admin paneli (demo)</button></div></div><div><h3 className="text-sm font-bold">Aloqa</h3><p className="mt-4 text-xs text-slate-400">Savollaringiz bormi?</p><p className="mt-2 text-sm font-bold">+998 94 510 07 05</p><p className="mt-1 text-xs text-slate-400">support@MebelTech.uz</p></div></div><div className="mt-9 border-t border-white/10 pt-5 text-center text-[10px] text-slate-500">© 2026 MebelTech. Barcha huquqlar himoyalangan.</div></div></footer>

      {drawer && <div className="fixed inset-0 z-50 flex justify-end bg-navy/40" onClick={()=>setDrawer(false)}><aside onClick={e=>e.stopPropagation()} className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl"><div className="flex items-center justify-between border-b p-5"><div><h2 className="text-xl font-black">Savatingiz</h2><p className="text-xs text-slate-500">{count} ta mahsulot</p></div><button onClick={()=>setDrawer(false)} className="rounded-xl bg-slate-100 p-2"><X size={20}/></button></div><div className="flex-1 overflow-y-auto p-5">{cart.length===0?<div className="py-20 text-center"><ShoppingCart className="mx-auto text-slate-300" size={42}/><h3 className="mt-4 font-bold">Savatingiz hozircha bo‘sh</h3><p className="mt-1 text-sm text-slate-500">Yoqtirgan mahsulotingizni savatga qo‘shing.</p><button onClick={()=>setDrawer(false)} className="mt-5 rounded-xl bg-orange px-5 py-3 text-sm font-bold text-white">Xaridni davom ettirish</button></div>:<div className="space-y-4">{cart.map(i=><div key={i.product.id} className="flex gap-3 border-b border-slate-100 pb-4"><img src={i.product.image} alt={i.product.name} className="h-20 w-20 rounded-xl object-cover"/><div className="min-w-0 flex-1"><p className="text-sm font-bold">{i.product.name}</p><p className="mt-1 text-xs text-slate-500">{money(i.product.price)}</p><div className="mt-3 flex items-center gap-3"><button onClick={()=>changeQty(i.product.id,-1)} className="rounded-lg border p-1"><Minus size={13}/></button><b className="text-sm">{i.qty}</b><button onClick={()=>changeQty(i.product.id,1)} className="rounded-lg border p-1"><Plus size={13}/></button><button onClick={()=>setCart(old=>old.filter(x=>x.product.id!==i.product.id))} className="ml-auto text-slate-400 hover:text-red-500"><Trash2 size={16}/></button></div></div></div>)}</div>}</div>{cart.length>0&&<div className="border-t p-5"><div className="mb-4 flex justify-between"><span className="text-sm text-slate-500">Jami summa</span><b className="text-lg">{money(total)}</b></div><button onClick={()=>{setNotice("Buyurtma demo rejimida qabul qilindi!");setCart([]);setDrawer(false);setTimeout(()=>setNotice(""),2500)}} className="w-full rounded-xl bg-orange py-3.5 text-sm font-extrabold text-white hover:bg-orange-600">Buyurtma berish</button><p className="mt-2 text-center text-[10px] text-slate-400">Demo: haqiqiy to‘lov amalga oshirilmaydi.</p></div>}</aside></div>}
      {notice&&<div className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-navy px-5 py-3 text-sm font-bold text-white shadow-xl">{notice}</div>}
      <button onClick={()=>setPage("admin")} className="fixed bottom-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-lg transition hover:text-orange" title="Admin paneli"><LayoutDashboard size={19}/></button>
    </main>
  );
}

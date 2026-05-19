import Link from "next/link";
import { useState } from "react";

const Footer = () => {
    const [email, setEmail] = useState("");

    // আইকনগুলো আরও মডার্ন করা হয়েছে
    const MailIcon = () => (<svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.6654 4.66699L8.67136 8.48499C8.46796 8.60313 8.23692 8.66536 8.0017 8.66536C7.76647 8.66536 7.53544 8.60313 7.33203 8.48499L1.33203 4.66699M2.66536 2.66699H13.332C14.0684 2.66699 14.6654 3.26395 14.6654 4.00033V12.0003C14.6654 12.7367 14.0684 13.3337 13.332 13.3337H2.66536C1.92898 13.3337 1.33203 12.7367 1.33203 12.0003V4.00033C1.33203 3.26395 1.92898 2.66699 2.66536 2.66699Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    
    const PhoneIcon = () => (<svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.22003 11.045C9.35772 11.1082 9.51283 11.1227 9.65983 11.086C9.80682 11.0493 9.93692 10.9636 10.0287 10.843L10.2654 10.533C10.3896 10.3674 10.5506 10.233 10.7357 10.1404C10.9209 10.0479 11.125 9.99967 11.332 9.99967H13.332C13.6857 9.99967 14.0248 10.1402 14.2748 10.3902C14.5249 10.6402 14.6654 10.9794 14.6654 11.333V13.333C14.6654 13.6866 14.5249 14.0258 14.2748 14.2758C14.0248 14.5259 13.6857 14.6663 13.332 14.6663C10.1494 14.6663 7.09719 13.4021 4.84675 11.1516C2.59631 8.90119 1.33203 5.84894 1.33203 2.66634C1.33203 2.31272 1.47251 1.97358 1.72256 1.72353C1.9726 1.47348 2.31174 1.33301 2.66536 1.33301H4.66536C5.01899 1.33301 5.35812 1.47348 5.60817 1.72353C5.85822 1.97358 5.9987 2.31272 5.9987 2.66634V4.66634C5.9987 4.87333 5.9505 5.07749 5.85793 5.26263C5.76536 5.44777 5.63096 5.60881 5.46536 5.73301L5.15336 5.96701C5.03098 6.06046 4.94471 6.1934 4.90923 6.34324C4.87374 6.49308 4.89122 6.65059 4.9587 6.78901C5.86982 8.63959 7.36831 10.1362 9.22003 11.045Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    
    const MapPinIcon = () => (<svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.3346 6.66634C13.3346 9.99501 9.64197 13.4617 8.40197 14.5323C8.28645 14.6192 8.14583 14.6662 8.0013 14.6662C7.85677 14.6662 7.71615 14.6192 7.60064 14.5323C6.36064 13.4617 2.66797 9.99501 2.66797 6.66634C2.66797 5.25185 3.22987 3.8953 4.23007 2.89511C5.23026 1.89491 6.58681 1.33301 8.0013 1.33301C9.41579 1.33301 10.7723 1.89491 11.7725 2.89511C12.7727 3.8953 13.3346 5.25185 13.3346 6.66634Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M8.0013 8.66634C9.10587 8.66634 10.0013 7.77091 10.0013 6.66634C10.0013 5.56177 9.10587 4.66634 8.0013 4.66634C6.89673 4.66634 6.0013 5.56177 6.0013 6.66634C6.0013 7.77091 6.89673 8.66634 8.0013 8.66634Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)

    const FacebookIcon = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.9987 1.66699H12.4987C11.3936 1.66699 10.3338 2.10598 9.55242 2.88738C8.77102 3.66878 8.33203 4.72859 8.33203 5.83366V8.33366H5.83203V11.667H8.33203V18.3337H11.6654V11.667H14.1654L14.9987 8.33366H11.6654V5.83366C11.6654 5.61265 11.7532 5.40068 11.9094 5.2444C12.0657 5.08812 12.2777 5.00033 12.4987 5.00033H14.9987V1.66699Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    
    const InstagramIcon = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.5846 5.41699H14.593M5.83464 1.66699H14.168C16.4692 1.66699 18.3346 3.53247 18.3346 5.83366V14.167C18.3346 16.4682 16.4692 18.3337 14.168 18.3337H5.83464C3.53345 18.3337 1.66797 16.4682 1.66797 14.167V5.83366C1.66797 3.53247 3.53345 1.66699 5.83464 1.66699ZM13.3346 9.47533C13.4375 10.1689 13.319 10.8772 12.9961 11.4995C12.6732 12.1218 12.1623 12.6265 11.536 12.9417C10.9097 13.2569 10.2 13.3667 9.50779 13.2553C8.81557 13.1439 8.1761 12.8171 7.68033 12.3213C7.18457 11.8255 6.85775 11.1861 6.74636 10.4938C6.63497 9.80162 6.74469 9.0919 7.05991 8.46564C7.37512 7.83937 7.87979 7.32844 8.50212 7.00553C9.12445 6.68261 9.83276 6.56415 10.5263 6.66699C11.2337 6.7719 11.8887 7.10154 12.3944 7.60725C12.9001 8.11295 13.2297 8.76789 13.3346 9.47533Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    
    const TwitterIcon = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M18.3346 3.33368C18.3346 3.33368 17.7513 5.08368 16.668 6.16701C18.0013 14.5003 8.83464 20.5837 1.66797 15.8337C3.5013 15.917 5.33464 15.3337 6.66797 14.167C2.5013 12.917 0.417969 8.00034 2.5013 4.16701C4.33464 6.33368 7.16797 7.58368 10.0013 7.50034C9.2513 4.00034 13.3346 2.00034 15.8346 4.33368C16.7513 4.33368 18.3346 3.33368 18.3346 3.33368Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    
    const LinkedinIcon = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.3346 6.66699C14.6607 6.66699 15.9325 7.19378 16.8702 8.13146C17.8079 9.06914 18.3346 10.3409 18.3346 11.667V17.5003H15.0013V11.667C15.0013 11.225 14.8257 10.801 14.5131 10.4885C14.2006 10.1759 13.7767 10.0003 13.3346 10.0003C12.8926 10.0003 12.4687 10.1759 12.1561 10.4885C11.8436 10.801 11.668 11.225 11.668 11.667V17.5003H8.33464V11.667C8.33464 10.3409 8.86142 9.06914 9.7991 8.13146C10.7368 7.19378 12.0086 6.66699 13.3346 6.66699Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M5.0013 7.50033H1.66797V17.5003H5.0013V7.50033Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M3.33464 5.00033C4.25511 5.00033 5.0013 4.25413 5.0013 3.33366C5.0013 2.41318 4.25511 1.66699 3.33464 1.66699C2.41416 1.66699 1.66797 2.41318 1.66797 3.33366C1.66797 4.25413 2.41416 5.00033 3.33464 5.00033Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)

    const linkSections = [
        {
            title: "পণ্য",
            links: [
                { text: "উন্নত বীজ", path: '/products/seeds', icon: null },
                { text: "সার ও কীটনাশক", path: '/products/fertilizers', icon: null },
                { text: "কৃষি যন্ত্রপাতি", path: '/products/machinery', icon: null },
                { text: "জৈব সার", path: '/products/organic', icon: null },
            ]
        },
        {
            title: "ওয়েবসাইট",
            links: [
                { text: "হোম", path: '/', icon: null },
                { text: "আমাদের সম্পর্কে", path: '/about', icon: null },
                { text: "গোপনীয়তা নীতি", path: '/privacy', icon: null },
                { text: "সদস্য হন", path: '/pricing', icon: null },
                { text: "সহায়তা কেন্দ্র", path: '/support', icon: null },
            ]
        },
        {
            title: "যোগাযোগ",
            links: [
                { text: "+৮৮০১৭১২৩৪৫৬৭৮", path: "tel:+8801712345678", icon: PhoneIcon },
                { text: "info@chashibhai.com", path: "mailto:info@chashibhai.com", icon: MailIcon },
                { text: "ধানমন্ডি, ঢাকা-১২০৫", path: "https://maps.google.com", icon: MapPinIcon }
            ]
        }
    ];

    const socialIcons = [
        { icon: FacebookIcon, link: "https://www.facebook.com", label: "Facebook" },
        { icon: InstagramIcon, link: "https://www.instagram.com", label: "Instagram" },
        { icon: TwitterIcon, link: "https://twitter.com", label: "Twitter" },
        { icon: LinkedinIcon, link: "https://www.linkedin.com", label: "LinkedIn" },
    ]

    const handleSubscribe = (e) => {
        e.preventDefault();
        // হ্যান্ডেল সাবস্ক্রাইব
        console.log("Subscribed with:", email);
        setEmail("");
        alert("ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।");
    }

    return (
        <footer className="bg-gradient-to-br from-gray-50 to-white border-t border-gray-200">
            {/* নিউজলেটার সেকশন - নতুন যোগ করা হয়েছে */}
            <div className="bg-gradient-to-r from-green-600 to-green-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                কৃষি আপডেট পেতে সাবস্ক্রাইব করুন
                            </h3>
                            <p className="text-green-100">
                                সেরা কৃষি টিপস, পণ্যের অফার ও নতুন উদ্ভাবন জানতে আমাদের নিউজলেটারে জয়েন করুন।
                            </p>
                        </div>
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="আপনার ইমেইল ঠিকানা"
                                className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-green-100/70 focus:outline-none focus:ring-2 focus:ring-white/50 w-full sm:w-72 transition-all"
                                required
                            />
                            <button 
                                type="submit"
                                className="px-6 py-3 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                সাবস্ক্রাইব
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* মেইন ফুটার কন্টেন্ট */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 py-12 lg:py-16">
                    
                    {/* ব্র্যান্ড সেকশন - বড় করা হয়েছে */}
                    <div className="md:col-span-5 space-y-5">
                        <Link href="/" className="inline-block group">
                            <div className="flex items-baseline">
                                <span className="text-4xl lg:text-5xl font-bold text-green-600 group-hover:text-green-700 transition">চাষী</span>
                                <span className="text-4xl lg:text-5xl font-bold text-gray-800 group-hover:text-gray-900 transition">ভাই</span>
                                <span className="text-5xl lg:text-6xl font-bold text-green-600 group-hover:text-green-700 transition">.</span>
                            </div>
                            <div className="h-0.5 w-0 group-hover:w-full bg-green-500 transition-all duration-500 mt-1"></div>
                        </Link>
                        
                        <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                            🌾 চাষী ভাই-এ স্বাগতম। এখানে আপনি উন্নতমানের বীজ ও কৃষি পণ্য পাবেন।
                            আপনার ফসলের জন্য সেরা গুণগত মান আমরা নিশ্চিত করি। আমাদের পণ্য বৈজ্ঞানিকভাবে নির্বাচিত,
                            যাতে আপনার ফসল বেশি উৎপাদনশীল ও সুস্থ থাকে। <span className="text-green-600 font-medium">চাষী ভাই — আপনার কৃষির সেরা সহচর।</span> 🌱
                        </p>
                        
                        {/* সোশ্যাল লিংক */}
                        <div className="space-y-3">
                            <p className="text-gray-500 text-sm font-medium">সোশ্যাল মিডিয়ায় সংযুক্ত থাকুন</p>
                            <div className="flex items-center gap-3">
                                {socialIcons.map((item, i) => (
                                    <Link 
                                        href={item.link} 
                                        key={i}
                                        aria-label={item.label}
                                        className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <item.icon />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* লিংক সেকশনগুলো */}
                    <div className="md:col-span-7">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {linkSections.map((section, index) => (
                                <div key={index} className="space-y-4">
                                    <h3 className="font-bold text-gray-800 text-lg relative inline-block">
                                        {section.title}
                                        <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-green-500 rounded-full"></span>
                                    </h3>
                                    <ul className="space-y-3">
                                        {section.links.map((link, i) => (
                                            <li key={i}>
                                                <Link 
                                                    href={link.path} 
                                                    className="group flex items-center gap-2.5 text-gray-500 hover:text-green-600 transition-all duration-300 text-sm"
                                                >
                                                    {link.icon && (
                                                        <span className="text-gray-400 group-hover:text-green-500 transition-colors">
                                                            <link.icon />
                                                        </span>
                                                    )}
                                                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                                                        {link.text}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* কপিরাইট সেকশন */}
                <div className="py-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p className="text-gray-500 text-center md:text-left">
                        © {new Date().getFullYear()} <span className="font-semibold text-green-600">চাষী ভাই</span> — সর্বস্বত্ব সংরক্ষিত।
                    </p>
                    <div className="flex gap-6">
                        <Link href="/terms" className="text-gray-500 hover:text-green-600 transition">শর্তাবলী</Link>
                        <Link href="/privacy" className="text-gray-500 hover:text-green-600 transition">গোপনীয়তা নীতি</Link>
                        <Link href="/cookies" className="text-gray-500 hover:text-green-600 transition">কুকি নীতি</Link>
                    </div>
                </div>
            </div>

            {/* ব্যাক টু টপ বাটন */}
            <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 hover:scale-110 transition-all duration-300 z-50 group"
                aria-label="উপরে যান"
            >
                <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </footer>
    );
};

export default Footer;
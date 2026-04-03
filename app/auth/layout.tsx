export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex">
            {/* Background Decoration */}
            <div className="fixed left-0 top-0 h-full w-32 pointer-events-none z-0">
                <svg viewBox="0 0 100 400" className="h-full w-full opacity-20" fill="none">
                    <circle cx="-30" cy="150" r="80" stroke="#1e3a8a" strokeWidth="20" fill="none" />
                    <circle cx="20" cy="300" r="60" stroke="#1e3a8a" strokeWidth="15" fill="none" />
                    <circle cx="10" cy="50" r="10" fill="#1e3a8a" opacity="0.5" />
                    <circle cx="30" cy="80" r="5" fill="#1e3a8a" opacity="0.3" />
                    <circle cx="50" cy="120" r="8" fill="#1e3a8a" opacity="0.4" />
                </svg>
            </div>
            <div className="relative z-10 flex-1">
                {children}
            </div>
        </div>
    )
}

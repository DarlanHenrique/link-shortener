
export default function AppLogo() {
    return (
        <>
            <div className="flex size-8 items-center justify-center rounded-md text-sidebar-primary-foreground">
                <img src="/logo.png" alt="Logo"/>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">EncurtaLink</span>
            </div>
        </>
    );
}

function CopyableHeader({ children, id, className }: { children: string, id?: string, className?: string|undefined }) {
    return (
        <h1 className={className} id={id}>{children} <a className="url" href={"#" + id} title="Right click -> Copy link to this section">#</a></h1>
    )
}

export default CopyableHeader
interface HeaderProps{
    label: string;
};

export const Header = ({
    label,
}: HeaderProps) => {
  return (
    <p className="text-muted-foreground text-sm">{label}</p>
  )
}
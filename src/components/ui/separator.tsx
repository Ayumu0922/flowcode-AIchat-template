import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

function Separator({
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={orientation === "vertical" ? "shrink-0 bg-border w-px self-stretch" : "shrink-0 bg-border h-px w-full"}
      {...props}
    />
  )
}

export { Separator }

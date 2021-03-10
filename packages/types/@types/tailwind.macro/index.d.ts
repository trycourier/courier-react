declare module "tailwind.macro" {
  import tw from "tailwind.macro";
  export default function tw(
    templateString: TemplateStringsArray
  ): Interpolation<
    ThemedStyledProps<
      Pick<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>
    >
  >;
}

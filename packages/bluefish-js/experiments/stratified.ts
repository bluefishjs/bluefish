// Inspired by Jetpack Compose and looking through my Bluefish examples
namespace Stratified {
  export declare function Group(...args: any[]): any;
  export declare function Row(...args: any[]): any;
  export declare function Col(...args: any[]): any;
  export declare function BFText(text: string): any;
  export declare function Distribute(...args: any[]): any;
  export declare function Align(...args: any[]): any;

  // Elliot's example
  const example1 = () => {
    return Group(
      BFText("10").name("top"),
      Row(BFText("SUM").name("sum"), BFText("n")).name("row"),
      BFText("n = 1").name("bottom")
    ).constraint(({ top, sum, row, bottom }: any) => {
      return Group(
        Distribute("vertical", top, row, bottom),
        // at this point the y coordinates of top, row, and bottom are known and the x coordinates are
        // unknown
        // the position of sum has been completely locally determined because of row
        Align("horizontal", top, sum, bottom)
        // at this point the align works by first reading the x coordinates of top, sum, and bottom
        // b/c sum was determined locally already, it's x coordinate is known by inferring a default
        // position for row
        // the x coordinates of top and bottom are then aligned with sum
      );
    });
  };

  // Elliot's example with Distribute and Align swapped
  const example2 = () => {
    return Group(
      BFText("10").name("top"),
      Row(BFText("SUM").name("sum"), BFText("n")).name("row"),
      BFText("n = 1").name("bottom")
    ).constraint(({ top, sum, row, bottom }: any) => {
      // TODO: maybe the group doesn't make sense here b/c going another level of constraint might not
      // actually work
      return Group(
        Align("horizontal", top, sum, bottom),
        // at this point the x coordinates of top, sum, and bottom are known
        // row's x coordinate has been defaulted to 0 because sum's x coordinate was written
        Distribute("vertical", top, row, bottom)
        // at this point the y coordinates of top, row, and bottom are set to a default value since
        // none of them had values before this
      );
    });
  };

  // Row definition
  const example3 = () => {
    return Group(
      BFText("a").name("a"),
      BFText("b").name("b"),
      BFText("c").name("c")
    ).constraint(({ a, b, c }: any) => {
      return Group(
        Align("horizontal", a, b, c),
        Distribute("horizontal", a, b, c)
      );
    });
  };

  /* <Group>
      <Plot
        name={plot}
        data={wheat}
        x={({ width }) =>
          scaleBand(
            wheat.map((d) => d.year),
            [0, width],
          ).padding(0.1)
        }
        y={({ height }) => scaleLinear([0, _.max(wheat.map((d) => +d.wheat))!], [height, 0])}
        color={() => (x: any) => x}
      >
        <BarY spacing={0} x="year" y="wheat" color="#aaa" stroke="#999" />
        <Area x="year" y="wages" color="#a4cedb" opacity={0.7} />
        <NewLine x="year" y="wages" />
        <NewLine x="year" y="wages" dy={-2} color="#ee8182" />
        <NewRect
          name={monarchName}
          names={monarchNames}
          data={monarch}
          x1="start"
          x2="end"
          height={10}
          color={(d) => (d.commonwealth === true ? 'none' : 'black')}
          stroke="black"
        />
      </Plot>
      <Align alignment="top">
        <Ref select={plot} />
        <Ref select={monarchNames[0]} />
      </Align>
      <Align>
        {monarch.map((m, i) => (
          <Ref select={monarchNames[i]} guidePrimary={i % 2 === 0 || m.commonwealth === true ? 'bottom' : 'top'} />
        ))}
      </Align>
      {monarch.map((m, i) => (
        <>
          <Distribute direction="vertical" spacing={1}>
            <Ref select={monarchNames[i]} />
            <Text name={monarchNameNames[i]} contents={m.name} fontStyle="italic" fontSize="12px" fontFamily="serif" />
          </Distribute>
          <Align alignment="centerHorizontally">
            <Ref select={monarchNames[i]} />
            <Ref select={monarchNameNames[i]} />
          </Align>
        </>
      ))}
    </Group> */

  // playfair
  const monarchs: any[] = [];
  const example4 = () => {
    return Group(
      Plot(BarY(), Area(), Line(), Line(), Rect().name("monarchName")).name(
        "plot"
      )
    ).constrain(({ monarchName, plot }: any) => {
      return Group(
        Align("top", plot, monarchName.get(0)),
        Align("centerHorizontally", ...monarchs.map((m) => m.name)),
        ...monarchs.map((m, i) =>
          Col(
            monarchName.get(i),
            BFText(m.name)
              .fontStyle("italic")
              .fontSize("12px")
              .fontFamily("serif")
          )
        )
      );
    });
  };

  /* Takeaways

I think this kind of syntax is doable with syntactic sugar. Basically you just append the
constraints to the group and proceed as normal? There are a couple things to note here though:

- First, pure constraint things like `Align` do not have an extent. The bbox calculations for the
  groups in these cases are still consistent because the elements of the groups are written out
  explicitly. This pattern is afforded (enforced?) by the constraint syntax, whereas in Bluefish
  currently you can just write the elements inside a constraint (and so if e.g. Align didn't have a
  bbox you might be confused esp. since e.g. Row has a bbox).

- Notice that normal elements can still appear in the constraints such as `Col` in the playfair
  example. Should these elements also contribute to the bounding box or not? One reason it may be
  good to NOT have them contribute to the bounding box is when links are involved. If you link
  something to an arbitrary element, then the bbox of that element will contribute to the bbox of
  this component. That behavior should be consistent with using an align instead of a link. If we
  don't use aligns for bbox calculations, then we should also not use links for bbox calculations.
  Another reason why `Col` should not contribute to the bbox is that it is not easy to distinguish
  between a constraint thing and a normal element so you might not know whether it contributes to
  the bbox or not. Then again, maybe we should syntactically distinguish them? How would you know
  what can be safely nested since only element things can be nested and not constraint things.
*/

  function BarY(): any {
    throw new Error("Function not implemented.");
  }

  function Area(): any {
    throw new Error("Function not implemented.");
  }

  function Line(): any {
    throw new Error("Function not implemented.");
  }

  function Rect(): any {
    throw new Error("Function not implemented.");
  }
  function Plot(...args: any[]): any {
    throw new Error("Function not implemented.");
  }
}

export {};

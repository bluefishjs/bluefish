# Adding a test

Make a new file called `<MyExample>.stories.tsx`.

```tsx
const meta: Meta = {
  title: "Example/<GrammarIfApplicable>/<MyExample>",
};

export default meta;
type Story = StoryObj;

export const Cars: Story = {
  render: () => {
    return <MyExampleCode>
  }
}
```

These examples are checked for differences on every commit.

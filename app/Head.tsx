// app/head.tsx
export default function Head() {
  return (
    <>
      <title>FoodLoop</title>
      <meta
        name="description"
        content="A community platform for sharing food and reducing waste"
      />

      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo.png" />
    </>
  );
}

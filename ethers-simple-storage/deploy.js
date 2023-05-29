async function main() {
  console.log("--- Starting deployment ---");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

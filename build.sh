# Dependencies:
# - [Pandoc](https://pandoc.org/installing.html)
#

output_file="index.html"

# Remove the output file if it exists.
if [ -f "$output_file" ]; then
  rm "$output_file"
fi

# Create the output file.
echo "<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />

  <link rel=\"stylesheet\" href=\"style.css\" />
  <title>1st | acmcsufoss</title>
</head>
<body>
  <h1>Welcome to First Contributions!</h1>

  <p>
    This is a repository dedicated for new members of the ACM at CSUF
    <b>Open Source Software Team</b> to make their first contributions to the
    acmcsufoss org! Let us walk through the steps so you can make your first
    commit, pull request, or issue closing to become a contributor of our
    beloved community!
  </p>

   <p>
    Instructions on how to contribute can be found at <a
      href=\"https://github.com/acmcsuf.com/1st\"
      >https://github.com/acmcsuf.com/1st</a>. If you have any questions, feel
    free to ask in the <a href=\"https://acmcsuf.com/discord\"
      >#first-contributions</a> channel in our Discord server.
  </p>

  <h2>References</h2>
  <ul>
    <li><a href=\"https://acmcsuf.com/1st\">acmcsuf.com/1st</a></li>
    <li>
      <a
        href=\"https://github.com/firstcontributions/first-contributions#readme\"
        >First contributions
      </a>
    </li>
  </ul>

  <h2>List of contributors</h2>
  <ul>" >>"$output_file"

# Loop through all GFM files.
for file in notes/*.md; do
  # Open the li element.
  echo "    <li>" >>"$output_file"

  # Convert GFM files to HTML and append to output file.
  pandoc -f gfm -t html "$file" >>"$output_file"

  # Close the li element.
  echo "    </li>" >>"$output_file"
done

# Finish the output file.
echo "  </ul>
</body>
</html>" >>"$output_file"

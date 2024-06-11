import os
import shutil
import zipfile


def kebab_to_camel(s):
    # Divide la stringa in kebab case in una lista di parole
    words = s.split('-')

    # Concatena le parole convertendo la prima lettera di ciascuna parola (tranne la prima) in maiuscolo
    camel_case = ''.join(word.capitalize() for word in words[0:1] + words[1:])

    return camel_case


def create_zip(file_path, output_dir):
    # Create a temporary directory to store the files to be zipped
    temp_dir = os.path.join(output_dir, "temp")
    os.makedirs(temp_dir, exist_ok=True)

    # Copy file to temporary directory and rename it to template.html
    shutil.copy(file_path, os.path.join(temp_dir, "template.html"))

    # Copy style.css to temporary directory
    shutil.copy("src/style.css", temp_dir)

    # Copy assets folder and its contents to temporary directory
    shutil.copytree("src/assets", os.path.join(temp_dir, "assets"))

    # Create the zip file
    with zipfile.ZipFile(os.path.join(output_dir, "template.zip"), "w") as zipf:
        # Write files in temporary directory to the zip file
        for root, _, files in os.walk(temp_dir):
            for file in files:
                file_path = os.path.join(root, file)
                zipf.write(file_path, os.path.relpath(file_path, temp_dir))

    # Remove the temporary directory
    shutil.rmtree(temp_dir)


def main():
    # Path to the template directory
    template_dir = "src"

    # Output directory where zip files will be created
    output_dir = "output"

    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    # Iterate over files in the template directory
    for file_name in os.listdir(template_dir):
        file_path = os.path.join(template_dir, file_name)
        if os.path.isfile(file_path) and file_path.endswith(".hbs"):
            file_name = kebab_to_camel(file_name)
            # Create a directory with the file name
            folder_name = os.path.splitext(file_name)[0]
            folder_path = os.path.join(output_dir, folder_name)
            os.makedirs(folder_path, exist_ok=True)

            # Create a zip file for the current file
            create_zip(file_path, folder_path)


if __name__ == "__main__":
    main()

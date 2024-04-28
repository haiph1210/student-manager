package com.student_manager.utils.uploadfile.impl;


import com.student_manager.core.ApiException;
import com.student_manager.core.ERROR;
import com.student_manager.utils.uploadfile.UploadFile;
import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Stream;

@Component
public class UploadFileImpl implements UploadFile {
    public UploadFileImpl() {
    }

    public boolean isImageFile(MultipartFile file) {
        String fileName = FilenameUtils.getExtension(file.getOriginalFilename());
        return Arrays.asList(new String[]{"png", "jpg", "jpeg", "bmp", "jfif"}).contains(fileName.trim().toLowerCase());
    }

    @Override
    public String saveFile(MultipartFile file, String name, Path path) throws ApiException {
        try {
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        if (file.isEmpty()) {
            throw new ApiException(ERROR.INVALID_REQUEST, "File Not Found");
        }
        if (!isImageFile(file)) {
            throw new ApiException(ERROR.INVALID_REQUEST, "File correctn't format");
        }
        float fileSize = file.getSize() / 1_000_000.0f;
        if (fileSize > 5.0f) {
            throw new ApiException(ERROR.INVALID_REQUEST, "File Upload < 5MB");
        }
        String fileName = FilenameUtils.getExtension(file.getOriginalFilename());
        LocalDateTime now = LocalDateTime.now();
        String today = now.toString().replace(":", "-").substring(0, 20);
        String gennarateFile = formatName(name) + "-" +
                today + "." +
                fileName;
        String pathEnd = path.toString().replace("\\", "/") + "/" + gennarateFile;
        Path destinationFilePath = path
                .resolve(Paths.get(gennarateFile))
                .normalize()
                .toAbsolutePath();
        if (!destinationFilePath.getParent().equals(path.toAbsolutePath())) {
            throw new RuntimeException("Hai đường dẫn khác nhau");
        }
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, destinationFilePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return pathEnd;
    }

    public String formatName(String name) {
        String normalized = Normalizer.normalize(name, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String removedDiacriticalMarks = pattern.matcher(normalized).replaceAll("");
        return removedDiacriticalMarks.replace(" ", "-");
    }


    @Override
    public List<String> saveListFile(List<MultipartFile> files, String name, Path path) throws ApiException {
        List<String> listPaths = new ArrayList<>();
        for (int i = 0; i < files.size(); i++) {
            String newName = name + "-" + (i + 1);
            String newPath = saveFile(files.get(i), newName, path);
            listPaths.add(newPath);
        }
        return listPaths;
    }

    @Override
    public byte[] readFileContent(String fileName, Path basePath, Path subPath) throws ApiException {
        try {
            // Assuming subPath is relative to basePath
            Path resolvedPath = basePath.resolve(subPath).resolve(fileName);

            Resource resource = new UrlResource(resolvedPath.toUri());
            if (resource.exists() || resource.isReadable()) {
                return StreamUtils.copyToByteArray(resource.getInputStream());
            } else {
                throw new ApiException(ERROR.INVALID_REQUEST,
                        "Could not read file: " + fileName);
            }
        } catch (IOException exception) {
            throw new ApiException(ERROR.INVALID_REQUEST,
                    "Could not read file: " + fileName);
        }
    }

    @Override
    public byte[] readFileContentMaster(String fileName, String basePath, Path path) throws ApiException {
//        String newPath = path.toUri().getPath().replace("/E:/MRS_YangkangRestaurant/YangKang_Restaurant/", "");
        String newPath = path.toUri().getPath().replace(basePath, "");
        String newFileName = "";
        if (fileName.contains(newPath)) {
            newFileName = fileName.trim().replace(newPath.toString(), "");
        }
        try {
            Path file = path.resolve(newFileName);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return StreamUtils.copyToByteArray(resource.getInputStream());
            } else {
                throw new ApiException(ERROR.INVALID_REQUEST,
                        "Could not read file: " + fileName);
            }
        } catch (Exception exception) {
            throw new ApiException(ERROR.INVALID_REQUEST,
                    "Could not read file: " + fileName);
        }
    }

    @Override
    public byte[] readFileContentMasterV2(String fileName, String basePath, String path) throws ApiException {
        try {
            Path fullPath = Paths.get(basePath, path, fileName);
            Resource resource = new UrlResource(fullPath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return StreamUtils.copyToByteArray(resource.getInputStream());
            } else {
                throw new ApiException(ERROR.INVALID_REQUEST, "Could not read file: " + fileName);
            }
        } catch (Exception exception) {
            throw new ApiException(ERROR.INVALID_REQUEST, "Could not read file: " + fileName, exception);
        }
    }

    @Override
    public List<byte[]> readFileContent2(String fileName, Path path) throws ApiException {
        StringBuilder config = new StringBuilder();
        List<byte[]> readFiles = new ArrayList<>();
        String newPath = path.toUri().getPath().replace("/E:/MRS_YangkangRestaurant/YangKang_Restaurant/", "");
        String newFileName = "";
        if (fileName.contains(newPath)) {
            newFileName = fileName.trim().replace(newPath.toString(), "");
        }
        String[] sliceFileName = newFileName.split(",");
        if (sliceFileName.length > 1) {
            for (String newF : sliceFileName) {
                try {
                    Path file = path.resolve(newF);
                    Resource resource = new UrlResource(file.toUri());
                    if (resource.exists() || resource.isReadable()) {
                        byte[] bytes = StreamUtils.copyToByteArray(resource.getInputStream());
                        config.append("data:image/jpeg;base64,").append(bytes);
                        readFiles.add(bytes);
                    } else {
                        throw new ApiException(ERROR.INVALID_REQUEST,
                                "Could not read file: " + fileName);
                    }
                } catch (IOException exception) {
                    throw new ApiException(ERROR.INVALID_REQUEST,
                            "Could not read file: " + fileName);
                }
            }
        } else {
            try {
                Path file = path.resolve(newFileName);
                Resource resource = new UrlResource(file.toUri());
                if (resource.exists() || resource.isReadable()) {
                    byte[] bytes = StreamUtils.copyToByteArray(resource.getInputStream());
                    config.append("data:image/jpeg;base64,").append(bytes);
                    readFiles.add(bytes);
//                        return readFiles;
                } else {
                    throw new ApiException(ERROR.INVALID_REQUEST,
                            "Could not read file: " + fileName);
                }
            } catch (IOException exception) {
                throw new ApiException(ERROR.INVALID_REQUEST,
                        "Could not read file: " + fileName);
            }
        }
        return readFiles;
    }

    @Override
    public void delete(Path path) throws ApiException {
        try {
            File file = new File(path.toUri());
            if (file.exists()) {
                file.delete();
            }
        } catch (Exception exception) {
            throw new ApiException(ERROR.INVALID_REQUEST, exception.getMessage());
        }
    }

    // htai ko dùng
    @Override
    public Stream<Path> loadAll(Path newPath) {
        try {
            return Files.walk(newPath, 1)
                    .filter(path -> !path.equals(newPath) && !path.toString().contains("._"))
                    .map(newPath::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load stored files", e);
        }
    }


}

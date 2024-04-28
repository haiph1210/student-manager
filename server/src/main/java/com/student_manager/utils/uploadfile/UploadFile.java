package com.student_manager.utils.uploadfile;

import com.student_manager.core.ApiException;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

public interface UploadFile {
    String saveFile(MultipartFile file, String name, Path path) throws ApiException;

    List<String> saveListFile(List<MultipartFile> files, String name, Path path) throws ApiException;

    byte[] readFileContent(String fileName, Path basePath, Path subPath) throws ApiException;

    byte[] readFileContentMaster(String fileName, String basePath, Path path) throws ApiException;

    byte[] readFileContentMasterV2(String fileName, String basePath, String path) throws ApiException;

    List<byte[]> readFileContent2(String fileName, Path path) throws ApiException;

    void delete(Path path) throws ApiException;

    Stream<Path> loadAll(Path newPath);
}

package com.stepup.demo.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {
    @Override
    public String uploadImage(String path, MultipartFile image) throws IOException {
        // File names of current / original file
        String originalFileName = image.getOriginalFilename();

        // Rename file uniquely
        String randomId = UUID.randomUUID().toString();
        // mat.jpg --> UUID:1234 --> 1234.jpg
        String fileName = randomId.concat(
                originalFileName.substring(
                        originalFileName.lastIndexOf('.')
                )
        );
        String filepath = path + File.separator + fileName;

        // Check if path exists and create
        File folder = new File(path);
        if(!folder.exists()){
            folder.mkdir();
        }


        // Upload to server
        Files.copy(image.getInputStream(), Paths.get(filepath));
        System.out.println("filepath: " + Paths.get(filepath).toAbsolutePath());
        // returning file name
        return fileName;
    }
}
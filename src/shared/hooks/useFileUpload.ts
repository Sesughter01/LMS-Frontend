"use client"

import { useState, useEffect } from 'react';
import { ApiRequestClient } from '../utils/api-client';

export const useFileUpload = (initialValue: File | (() => File | null) | null) => {
    const [file, setFile] = useState<File | null>(initialValue);
    const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [fileLink, setFileLink] = useState<string | null>(null);
    const [isUploadingFile, setIsUploadingFile] = useState(false);

    useEffect(() => {
        if (file) {
            setError(null);
        }
    }, [file]);

    const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>, uploadToServer = true) => {
        const file = evt.target.files?.[0];
        const fileName = file?.name;

        if (!file) {
            return;
        }

        if (uploadToServer) {
            handleFileUploadToServer(file)
        }

        setFile(file);
        setFilePreviewUrl(URL.createObjectURL(file));
    };

    const uploadFileToServer = () => {
        handleFileUploadToServer(file);
    }

    const handleFileUploadToServer = async (file: any) => {
        try {
            setIsUploadingFile(true);
            const formData = new FormData();
            // @ts-ignore
            formData.append("file", file);

            const response = await ApiRequestClient.post('/file/upload', formData, {
                'Content-Type': 'multipart/form-data'
            })
            setFileLink(response?.data?.data?.file_link)
        } catch (error) {
            setFileLink(null);
            setError('Error uploading file. Please try again!')
        } finally {
            setIsUploadingFile(false);
        }
    }

    return {
        handleFileChange,
        filePreviewUrl,
        fileLink,
        uploadFileToServer,
        error,
        isUploadingFile
    };
};
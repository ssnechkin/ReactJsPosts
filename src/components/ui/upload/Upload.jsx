import React, {useId} from 'react';


export type UploadPromise<T> = Promise<T> & { abort: () => void };

export const upload = <T>(file: File, url: string, options?: { onProgress?: (progress: number) => void }): UploadPromise<T> => {
  // Вытащили xhr из Promise, чтобы прокинуть abort
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  const onProgress = options?.onProgress;

  const promise = new UploadPromise((resolve, reject) => {
    xhr.open('POST', url);

    xhr.upload.onprogress = (event) => {
      onProgress?.(Math.round((event.loaded / event.total) * 100));
    };

    xhr.onload = () => {
      if (xhr.status === 200) resolve(xhr.response);
      else reject(xhr.response);
    };

    const myData = new FormData();
    myData.append('my_file', file);

    xhr.send(myData);
  })

  // Присвоили свойство abort, которое прервет запрос
  promise.abort = () => xhr.abort();

  return promise;
}

export type UploadProps = {
  onUpload: (data: unknown) => void;
  className?: string;
  children: React.ReactNode;
  overlay?: boolean;
  disabled?: boolean;
}

const Upload: FC<UploadProps> = ({ onUpload, url }) => {
      const handleFile = (file: File) => {
        if (!file) return;

        const uploading = upload<T>(file, url);
        uploading
          .then(onUpload)
          .catch((e) => {})
      };

      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleFile(event.target.files[0]);
      };

      const id = useId()
      return (
        <label htmlFor={id}>
          <input type="file" id={id} onChange={handleFileChange} />
        </label>
      );
};

export default Upload;
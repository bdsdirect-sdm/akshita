import { Formik, Form } from "formik";
import InputField from "../../components/common/InputField";
import IconBtn from "../../components/common/IconBtn";
import { WaveInterface } from "../../interfaces/interfaces";
import SearchBar from "../../components/SearchBar";
import { WaveValidationSchema } from "../../validations/WaveValidation";
import { PostWave } from "../../actions/waves";
import { useState } from "react";

const CreateWaves = () => {
  const name = localStorage.getItem("name");
  const pf = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;
  const wavesMutation = PostWave();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  function handleFileChange(e: any, setFieldValue: any, fieldName: string) {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      const validVideoTypes = ["video/mp4", "video/mkv"];

      if (validImageTypes.includes(file.type)) {
        setFieldValue("photos", file);
        setImagePreview(URL.createObjectURL(file));
        setError(null);
      } else if (validVideoTypes.includes(file.type)) {
        setFieldValue("videos", file);
        setVideoPreview(URL.createObjectURL(file));
        setError(null);
      } else {
        setError("Please upload a valid image (JPEG, PNG, GIF) or video (MP4, MKV) file.");
      }
    } else {
      setFieldValue("photos", null); // Reset if no file is selected
      setImagePreview(null);
      setVideoPreview(null);
    }
  }

  return (
    <div>
      <div className="bg-white">
        <div className="bg-[#C5B084] rounded-t-md w-full h-36 flex flex-row">
          <div className="flex flex-row p-8">
            <img className="rounded-full w-36 h-36" src={pf} alt="pfp" />
          </div>

          <div className="flex flex-row items-center justify-start flex-1">
            <h3 className="text-white">Upload a New Photo</h3>
          </div>

          <div className="flex flex-row items-center justify-end p-8">
            <button className="bg-white text-[#3E5677] px-5 py-2 rounded font-semibold">
              Change Picture
            </button>
          </div>
        </div>
        <div className="p-4">
          <p className="mt-10">What do you want to share?</p>
          <Formik
            initialValues={{
              photos: "",
              videos: "",
              post: "",
            }}
            validationSchema={WaveValidationSchema}
            onSubmit={async (values: WaveInterface) => {
              setLoading(true);
              setError(null);

              let formData = new FormData();
              formData.append("post", values.post);

              if (values.videos) formData.append("videos", values.videos);
              if (values.photos) formData.append("photos", values.photos);

              try {
                await wavesMutation.mutateAsync(formData);
                // Optionally handle success (e.g., redirect or show success message)
              } catch (error) {
                setError("Failed to create the wave. Please try again.");
              } finally {
                setLoading(false);
              }
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="flex flex-col">
                  <input
                    name="photos"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setFieldValue, "photos")}
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col mt-4">
                  <input
                    name="videos"
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileChange(e, setFieldValue, "videos")}
                  />
                  {videoPreview && (
                    <div className="mt-2">
                      <video controls className="w-32 h-32 rounded">
                        <source src={videoPreview} />
                      </video>
                    </div>
                  )}
                </div>

                <InputField
                  fieldName="post"
                  placeholder="Write Something..."
                  isRequired={false}
                  labelName=""
                  type="text"
                />

                {error && (
                  <div className="text-red-500 text-sm mt-2">
                    <p>{error}</p>
                  </div>
                )}

                <div className="flex justify-start mt-4">
                  <IconBtn
                    text={loading ? "Creating..." : "Create Wave"}
                    type="submit"
                    customClasses="text-white"
                    disabled={loading}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="p-4">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default CreateWaves;

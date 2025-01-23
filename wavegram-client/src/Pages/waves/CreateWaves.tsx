import { Formik, Form } from "formik";
import InputField from "../../components/common/InputField";
import IconBtn from "../../components/common/IconBtn";
import { WaveInterface } from "../../interfaces/interfaces";
import SearchBar from "../../components/SearchBar";
import { WaveValidationSchema } from "../../validations/WaveValidation";
import { PostWave } from "../../actions/waves";

const CreateWaves = () => {
  const name = localStorage.getItem("name");
  const pf = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;
  const wavesMutation = PostWave();

  function setFieldValue(arg0: string, arg1: any) {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <div className="bg-white">
        <div className="bg-[#C5B084] rounded-t-md w-full h-36 flex flex-row">
          <div className="flex flex-row p-8">
            <img className="rounded-full w-36 h-36" src={pf} alt="pfp" />
          </div>

          <div className="flex flex-row items-center justify-start  flex-1">
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
              wavesMutation.mutate(values);
            }}
          >
            {() => (
              <>
                <Form>
                  <input
                    name="photos"
                    placeholder="Upload Photos"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFieldValue("photos", e.target.files[0]); 
                      }
                    }}
                  />
                  <input
                    name="videos"
                    placeholder="Upload Videos"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFieldValue("Videos", e.target.files[0]); 
                      }
                    }}
                  />

                  <InputField
                    fieldName="post"
                    placeholder="Write Something..."
                    isRequired={false}
                    labelName=""
                    type="text"
                  />

                  <div className="flex justify-start">
                    <IconBtn
                      text="Create Wave"
                      type="submit"
                      customClasses="text-white"
                    />
                  </div>
                </Form>
              </>
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

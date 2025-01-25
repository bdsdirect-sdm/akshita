import { useState } from "react";
import { GetWaves } from "../../actions/waves";
import { WaveInterface } from "../../interfaces/interfaces";

const MakingWaves = () => {
  const { data } = GetWaves();
  
  const [selectedWaveId, setSelectedWaveId] = useState<number | null>(null);

  const handleModal = (id: number) => {
    setSelectedWaveId(id); 
  };

  const handleCloseModal = () => {
    setSelectedWaveId(null); 
  };

  const selectedWave = data?.Waves?.find((wave: WaveInterface) => wave.id === selectedWaveId);

  return (
    <div className="grid grid-cols-3 gap-10 py-4">
      {data?.Waves?.slice(0, 6).map((wave: WaveInterface, index) => (
        <button key={index} onClick={() => handleModal(wave?.id)}>
        <div className="flex flex-row space-x-4 border-r-2 justify-start px-8">
          <div className="justify-center items-center">
            <img
              className="h-10 w-10 rounded-full"
              src={wave.profilePhoto || `https://api.dicebear.com/5.x/initials/svg?seed=${wave.fullName}`}
              alt={`Profile picture of ${wave.fullName}`}
            />
          </div>
          <div>
            <span>@{wave.fullName.replace(/\s+/g, "")}</span>
            <p className="text-[#535C61] overflow-clip">{wave.post}</p>
            <p className="text-yellow-500">Follow</p>
          </div>
        </div>
      </button>
      ))}

      {selectedWave && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            
            <h2 className="text-xl font-semibold mb-4">Wave Details

            </h2>
            <button
              className=" text-xl text-red-500"
              onClick={handleCloseModal}
            >
              CLOSE
            </button>
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <img
                  className="h-16 w-16 rounded-full"
                  src={selectedWave.profilePhoto || `https://api.dicebear.com/5.x/initials/svg?seed=${selectedWave.fullName}`}
                  // alt={`Profile of ${selectedWave.fullName}`}
                />
                <span className="ml-4 text-lg">@{selectedWave.fullName.replace(/\s+/g, "")}</span>
              </div>
              <p className="text-gray-700">{selectedWave.post}</p>
              <div className="mt-4">
                {selectedWave.photos && (
                  <div>
                    <img src={selectedWave.photos}  className="w-full mt-2" />
                  </div>
                )}
                {selectedWave.videos && (
                  <div>
                    <video controls className="w-full mt-2">
                      <source src={selectedWave.videos} type="video/mp4" />
                    </video>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MakingWaves;

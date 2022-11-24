import requests, librosa

from app.core.celery_app import celery_app
from app.core.config import settings

from app import schemas

# The following task is an intensive task that:
# 1. Downloads the audio file from the URL
# 2. Extracts the audio features
# 3. Classifies the audio file with the trained model
# 4. Updates the database with the classification results


def extract_audio_features(file: bytes) -> list:
    """Extracts audio features from the audio file

    Args:
        file (bytes): Audio file

    Returns:
        list: Audio features
    """
    # Load the audio file
    audio, _ = librosa.load(file, sr=22050)

    # chroma_stft_mean	chroma_stft_var	rms_mean	rms_var	spectral_centroid_mean	spectral_centroid_var	spectral_bandwidth_var	zero_crossing_rate_var	harmony_mean	perceptr_mean	perceptr_var	tempo	mfcc1_mean	mfcc1_var	mfcc2_var	mfcc3_mean	mfcc3_var	mfcc4_mean	mfcc4_var	mfcc5_mean	mfcc5_var	mfcc6_mean	mfcc6_var	mfcc7_mean	mfcc7_var	mfcc8_mean	mfcc8_var	mfcc9_mean	mfcc9_var	mfcc10_mean	mfcc10_var	mfcc11_mean	mfcc11_var	mfcc12_mean	mfcc12_var	mfcc13_mean	mfcc13_var	mfcc14_mean	mfcc14_var	mfcc15_mean	mfcc15_var	mfcc16_mean	mfcc16_var	mfcc17_mean	mfcc17_var	mfcc18_mean	mfcc18_var	mfcc19_mean	mfcc19_var	mfcc20_mean

    # Extract audio features
    # chroma_stft_mean chroma_stft_var
    chroma_stft = librosa.feature.chroma_stft(y=audio, sr=22050)
    chroma_stft_mean = chroma_stft.mean()
    chroma_stft_var = chroma_stft.var()

    # rms_mean rms_var
    rms = librosa.feature.rms(y=audio)
    rms_mean = rms.mean()
    rms_var = rms.var()

    # spectral_centroid_mean spectral_centroid_var
    spectral_centroid = librosa.feature.spectral_centroid(y=audio, sr=22050)
    spectral_centroid_mean = spectral_centroid.mean()
    spectral_centroid_var = spectral_centroid.var()

    # spectral_bandwidth_var
    spectral_bandwidth = librosa.feature.spectral_bandwidth(y=audio, sr=22050)
    spectral_bandwidth_var = spectral_bandwidth.var()

    # zero_crossing_rate_var
    zero_crossing_rate = librosa.feature.zero_crossing_rate(y=audio)
    zero_crossing_rate_var = zero_crossing_rate.var()

    # harmony_mean
    harmony = librosa.effects.harmonic(y=audio)
    harmony_mean = harmony.mean()

    # perceptr_mean perceptr_var
    perceptr = librosa.effects.percussive(y=audio)
    perceptr_mean = perceptr.mean()

    # tempo
    tempo = librosa.beat.tempo(y=audio, sr=22050)

    # mfcc1_mean mfcc1_var mfcc2_var mfcc3_mean mfcc3_var mfcc4_mean mfcc4_var mfcc5_mean mfcc5_var mfcc6_mean mfcc6_var mfcc7_mean mfcc7_var mfcc8_mean mfcc8_var mfcc9_mean mfcc9_var mfcc10_mean mfcc10_var mfcc11_mean mfcc11_var mfcc12_mean mfcc12_var mfcc13_mean mfcc13_var mfcc14_mean mfcc14_var mfcc15_mean mfcc15_var mfcc16_mean mfcc16_var mfcc17_mean mfcc17_var mfcc18_mean mfcc18_var mfcc19_mean mfcc19_var mfcc20_mean
    mfcc = librosa.feature.mfcc(y=audio, sr=22050)
    mfcc_mean = mfcc.mean(axis=1)
    mfcc_var = mfcc.var(axis=1)

    # Create a list of audio features
    audio_features = [
        chroma_stft_mean,
        chroma_stft_var,
        rms_mean,
        rms_var,
        spectral_centroid_mean,
        spectral_centroid_var,
        spectral_bandwidth_var,
        zero_crossing_rate_var,
        harmony_mean,
        perceptr_mean,
        tempo,
    ]
    audio_features.extend(mfcc_mean)
    audio_features.extend(mfcc_var)

    return audio_features


@celery_app.task(bind=True, name="classify_audio_file")
def classify_audio(result_id: str, request_file: schemas.FileRequestSchema) -> None:
    # Download the audio file from the URL
    audio_file = requests.get(request_file.file_url, allow_redirects=True)

    # Extract the audio features
    audio_features = extract_audio_features(audio_file.content)
    print(audio_features)

// i started writing functions trying to be as general as possible
// so that i can use them in modular way, but that was stupid and
// the code is notmodular but it's hack-y & not precise instead
// aslo i gave up on modularity half way through im just tired now

const WIDTH = 1280;

const CONES = ["L", "M", "S"]
const RGBPM = ["R", "G", "B"]
const XYZPM = ["X", "Y", "Z"]
const COLORL = "#000";
const COLORM = "#000";
const COLORS = "#000";
const COLORR = "#000";
const LMSCOLORS = [COLORL, COLORM, COLORS];
const LMSMEANS = [71, 63, 37];
const RODMEANS = 48;
const LMSDEVNS = [34, 35, 20];
const RODDEVNS = 25;
const LMSNORMS = [0.016764, 0.016239, 0.028216];
const RODNORMS = 0.02222;
const LMSMAGNS = [1, 1, 1];

const ARRAYRSPSAT = new Array(126).fill(1);

// http://brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
const MATRIX_XYZ_RGB = [
    [ 2.3706743, -0.9000405, -0.4706338],
    [-0.5138850,  1.4253036,  0.0885814],
    [ 0.0052982, -0.0146949,  1.0093968]];
const MATRIX_RGB_XYZ = [
    [0.4887180, 0.3106803, 0.2006017],
    [0.1762044, 0.8129847, 0.0108109],
    [0.0000000, 0.0102048, 0.9897952]];
const MATRIX_LMS_SRGB = [
    [ 5.4336886, -4.77398843, 0.3306119],
    [-0.7913143,  1.75772089, 0.0353320],
    [ 0.0316132, -0.07734499, 1.0312963]];

const arraySPDGrey = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
const arraySPDPink = [0.561, 0.573, 0.585, 0.596, 0.606, 0.616, 0.625, 0.633, 0.640, 0.647, 0.653, 0.658, 0.662, 0.665, 0.667, 0.668, 0.669, 0.668, 0.667, 0.664, 0.661, 0.657, 0.652, 0.646, 0.640, 0.633, 0.625, 0.616, 0.607, 0.597, 0.587, 0.576, 0.565, 0.554, 0.542, 0.530, 0.518, 0.506, 0.494, 0.482, 0.470, 0.458, 0.447, 0.436, 0.425, 0.414, 0.404, 0.395, 0.386, 0.378, 0.370, 0.363, 0.357, 0.352, 0.348, 0.344, 0.342, 0.340, 0.340, 0.340, 0.342, 0.345, 0.348, 0.353, 0.359, 0.365, 0.373, 0.382, 0.392, 0.403, 0.414, 0.427, 0.441, 0.455, 0.471, 0.487, 0.504, 0.521, 0.539, 0.558, 0.577, 0.597, 0.617, 0.637, 0.657, 0.678, 0.698, 0.719, 0.739, 0.759, 0.779, 0.799, 0.818, 0.836, 0.854, 0.871, 0.888, 0.903, 0.918, 0.931, 0.944, 0.955, 0.965, 0.975, 0.982, 0.989, 0.994, 0.998, 1.000, 1.001, 1.001, 0.999, 0.996, 0.992, 0.986, 0.978, 0.970, 0.960, 0.949, 0.937, 0.923, 0.909, 0.893, 0.877, 0.859, 0.841];
const arraySPDOlive = [0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.001, 0.001, 0.001, 0.001, 0.002, 0.002, 0.003, 0.004, 0.005, 0.006, 0.008, 0.010, 0.012, 0.015, 0.018, 0.022, 0.027, 0.033, 0.040, 0.047, 0.057, 0.067, 0.079, 0.093, 0.109, 0.127, 0.146, 0.168, 0.193, 0.219, 0.248, 0.279, 0.313, 0.348, 0.386, 0.426, 0.467, 0.509, 0.553, 0.597, 0.641, 0.684, 0.727, 0.768, 0.808, 0.845, 0.879, 0.909, 0.936, 0.959, 0.977, 0.990, 0.997, 1.000, 0.997, 0.990, 0.977, 0.959, 0.936, 0.909, 0.879, 0.845, 0.808, 0.768, 0.727, 0.684, 0.641, 0.597, 0.553, 0.509, 0.467, 0.426, 0.386, 0.348, 0.313, 0.279, 0.248, 0.219, 0.193, 0.168, 0.146, 0.127, 0.109, 0.093, 0.079, 0.067, 0.057, 0.047, 0.040, 0.033, 0.027, 0.022, 0.018, 0.015, 0.012, 0.010, 0.008, 0.006, 0.005, 0.004, 0.003, 0.002, 0.002, 0.001, 0.001, 0.001, 0.001, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000];
const arraySPDPurple = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
const arraySPDSun = [0.390, 0.407, 0.415, 0.432, 0.449, 0.466, 0.483, 0.491, 0.517, 0.542, 0.551, 0.559, 0.585, 0.593, 0.601, 0.610, 0.627, 0.644, 0.652, 0.661, 0.686, 0.695, 0.712, 0.720, 0.729, 0.746, 0.762, 0.771, 0.788, 0.805, 0.813, 0.830, 0.839, 0.847, 0.847, 0.856, 0.864, 0.864, 0.873, 0.873, 0.873, 0.881, 0.881, 0.890, 0.898, 0.898, 0.907, 0.915, 0.915, 0.915, 0.915, 0.915, 0.915, 0.915, 0.915, 0.915, 0.915, 0.915, 0.915, 0.915, 0.915, 0.915, 0.915, 0.915, 0.915, 0.915, 0.915, 0.915, 0.915, 0.915, 0.907, 0.890, 0.881, 0.873, 0.873, 0.873, 0.873, 0.864, 0.856, 0.847, 0.839, 0.822, 0.813, 0.805, 0.788, 0.788, 0.779, 0.762, 0.762, 0.754, 0.746, 0.737, 0.737, 0.729, 0.729, 0.720, 0.712, 0.703, 0.686, 0.686, 0.669, 0.661, 0.644, 0.635, 0.627, 0.627, 0.618, 0.618, 0.618, 0.610, 0.601, 0.601, 0.593, 0.576, 0.568, 0.559, 0.551, 0.534, 0.517, 0.508, 0.491, 0.474, 0.466, 0.457, 0.440, 0.440, 0.440];

const arrayCOLMATX = [0.001, 0.001, 0.001, 0.002, 0.003, 0.004, 0.006, 0.008, 0.010, 0.013, 0.019, 0.027, 0.038, 0.048, 0.067, 0.092, 0.119, 0.144, 0.158, 0.174, 0.186, 0.192, 0.195, 0.194, 0.191, 0.187, 0.181, 0.174, 0.168, 0.158, 0.145, 0.128, 0.109, 0.096, 0.079, 0.063, 0.048, 0.036, 0.029, 0.020, 0.013, 0.008, 0.004, 0.003, 0.001, 0.002, 0.004, 0.009, 0.013, 0.023, 0.035, 0.050, 0.067, 0.079, 0.098, 0.119, 0.139, 0.161, 0.176, 0.200, 0.224, 0.249, 0.276, 0.293, 0.321, 0.349, 0.377, 0.405, 0.423, 0.451, 0.477, 0.501, 0.524, 0.537, 0.555, 0.570, 0.582, 0.589, 0.590, 0.589, 0.584, 0.573, 0.557, 0.544, 0.521, 0.495, 0.464, 0.429, 0.405, 0.369, 0.334, 0.301, 0.269, 0.249, 0.219, 0.191, 0.166, 0.142, 0.128, 0.109, 0.092, 0.076, 0.063, 0.055, 0.046, 0.038, 0.031, 0.026, 0.023, 0.018, 0.015, 0.012, 0.009, 0.008, 0.007, 0.006, 0.005, 0.004, 0.003, 0.003, 0.002, 0.002, 0.001, 0.001, 0.001, 0.001];
const arrayCOLMATY = [0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.001, 0.001, 0.001, 0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.008, 0.010, 0.012, 0.014, 0.016, 0.018, 0.021, 0.024, 0.028, 0.031, 0.035, 0.039, 0.045, 0.051, 0.055, 0.063, 0.071, 0.080, 0.090, 0.098, 0.111, 0.126, 0.144, 0.164, 0.179, 0.206, 0.236, 0.268, 0.303, 0.326, 0.361, 0.394, 0.423, 0.449, 0.465, 0.485, 0.503, 0.518, 0.530, 0.537, 0.545, 0.550, 0.554, 0.555, 0.555, 0.554, 0.550, 0.544, 0.535, 0.529, 0.517, 0.504, 0.489, 0.472, 0.460, 0.441, 0.421, 0.400, 0.379, 0.365, 0.343, 0.322, 0.301, 0.279, 0.266, 0.245, 0.225, 0.205, 0.185, 0.172, 0.153, 0.136, 0.121, 0.106, 0.097, 0.085, 0.073, 0.063, 0.053, 0.048, 0.040, 0.034, 0.028, 0.023, 0.020, 0.017, 0.014, 0.011, 0.009, 0.008, 0.007, 0.005, 0.004, 0.003, 0.003, 0.002, 0.002, 0.002, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.000, 0.000, 0.000];
const arrayCOLMATZ = [0.004, 0.005, 0.007, 0.009, 0.013, 0.018, 0.026, 0.038, 0.045, 0.061, 0.090, 0.130, 0.184, 0.231, 0.322, 0.443, 0.577, 0.699, 0.770, 0.857, 0.920, 0.961, 0.983, 0.989, 0.990, 0.985, 0.977, 0.963, 0.948, 0.915, 0.869, 0.800, 0.715, 0.660, 0.579, 0.501, 0.428, 0.362, 0.324, 0.273, 0.231, 0.196, 0.167, 0.151, 0.130, 0.112, 0.094, 0.077, 0.067, 0.054, 0.043, 0.036, 0.030, 0.027, 0.022, 0.018, 0.014, 0.011, 0.010, 0.007, 0.006, 0.004, 0.003, 0.003, 0.002, 0.002, 0.002, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000];
const arrayCOLMATR = [0.000, 0.000, 0.000, 0.000, 0.000, 0.001, 0.001, 0.001, 0.002, 0.002, 0.001, 0.001, 0.002, 0.004, 0.005, 0.006, 0.006, 0.007, 0.006, 0.001, -0.001, -0.007, -0.012, -0.019, -0.029, -0.039, -0.052, -0.065, -0.075, -0.087, -0.100, -0.113, -0.124, -0.132, -0.141, -0.150, -0.159, -0.166, -0.171, -0.180, -0.191, -0.202, -0.216, -0.225, -0.244, -0.260, -0.275, -0.287, -0.294, -0.295, -0.291, -0.279, -0.259, -0.243, -0.214, -0.179, -0.143, -0.100, -0.070, -0.019, 0.033, 0.089, 0.153, 0.193, 0.261, 0.331, 0.403, 0.478, 0.526, 0.603, 0.676, 0.747, 0.816, 0.858, 0.918, 0.971, 1.019, 1.054, 1.070, 1.087, 1.094, 1.087, 1.069, 1.050, 1.014, 0.970, 0.915, 0.850, 0.805, 0.737, 0.669, 0.604, 0.542, 0.502, 0.442, 0.387, 0.336, 0.288, 0.260, 0.222, 0.187, 0.154, 0.128, 0.112, 0.093, 0.077, 0.063, 0.053, 0.047, 0.036, 0.031, 0.024, 0.018, 0.016, 0.014, 0.012, 0.010, 0.008, 0.006, 0.006, 0.003, 0.003, 0.001, 0.002, 0.002, 0.002, 0.001];
const arrayCOLMATG = [0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.001, 0.003, 0.006, 0.010, 0.015, 0.021, 0.027, 0.035, 0.041, 0.049, 0.058, 0.069, 0.080, 0.087, 0.100, 0.113, 0.127, 0.141, 0.153, 0.172, 0.193, 0.218, 0.246, 0.266, 0.304, 0.345, 0.388, 0.434, 0.463, 0.507, 0.547, 0.580, 0.608, 0.624, 0.642, 0.657, 0.668, 0.673, 0.675, 0.674, 0.669, 0.662, 0.649, 0.640, 0.624, 0.604, 0.581, 0.554, 0.536, 0.505, 0.473, 0.439, 0.403, 0.379, 0.343, 0.307, 0.271, 0.237, 0.217, 0.186, 0.158, 0.134, 0.111, 0.099, 0.081, 0.066, 0.053, 0.043, 0.037, 0.028, 0.022, 0.017, 0.012, 0.010, 0.008, 0.005, 0.004, 0.002, 0.002, 0.001, 0.001, 0.001, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000];
const arrayCOLMATB = [0.004, 0.005, 0.007, 0.009, 0.013, 0.018, 0.026, 0.038, 0.045, 0.061, 0.090, 0.131, 0.185, 0.233, 0.325, 0.447, 0.582, 0.706, 0.777, 0.865, 0.929, 0.970, 0.993, 0.999, 1.000, 0.994, 0.986, 0.972, 0.957, 0.923, 0.877, 0.807, 0.721, 0.665, 0.583, 0.504, 0.431, 0.364, 0.325, 0.274, 0.231, 0.195, 0.166, 0.149, 0.128, 0.109, 0.090, 0.073, 0.062, 0.049, 0.037, 0.030, 0.024, 0.020, 0.015, 0.011, 0.007, 0.004, 0.003, 0.000, 0.000, -0.002, -0.003, -0.003, -0.004, -0.004, -0.003, -0.004, -0.004, -0.004, -0.003, -0.003, -0.003, -0.002, -0.002, -0.002, -0.001, -0.001, -0.002, -0.001, -0.001, -0.001, -0.001 -0.001, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000];

const arrayCOLMATRGB = [arrayCOLMATR, arrayCOLMATG, arrayCOLMATB];
const arrayCOLMATXYZ = [arrayCOLMATX, arrayCOLMATY, arrayCOLMATZ];
const RGBWAVES = [114, 59, 20]; // real wavelength = i * 2.8 + 380
const CMFLABELS = ["700nm", "546nm", "435nm"];
const CMFLABELPOS = [[960, 91], [500, 91], [130, 91]];

const BASEXOFF = 181;
const BASEYOFF = 481;
const BASEAXES = [[3, 0, 0, 1], [0, 2, 0, 1], [0, 0, 2, 1]];
const TRANSFMAT = [[400, 0, -120, BASEXOFF], [0, -400, 80, BASEYOFF]];
const CUBEPOINTS = [1, 1, 1];
const CUBELABELPOS = [1.1, 1.2, 1.25];
const CUBELABELOFF = [0.95, 1.1, 0.95];

const IDENTITY = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]


const canvasPhoton = initializeCanvas("canvasPhoton", 400);
const sliderPhotonWavelength = document.getElementById("sliderPhotonWavelength");
initializeSliders(sliderPhotonWavelength, 0.1, 0.4, 0.01, 0.3);
sliderPhotonWavelength.addEventListener("input", updatePhoton);
function updatePhoton() {
    canvasPhoton.clearRect(0, 0, WIDTH, 400);
    drawPhoton(canvasPhoton, 0.45 - sliderPhotonWavelength.value, 440, 200, 400, 150);
}
updatePhoton();


const canvasPhotonSpectrum = initializeCanvas("canvasPhotonSpectrum", 280);
initializeCanvasText(canvasPhotonSpectrum);
const arrayPhotonSpectrumWavelengths = ["1km", "1cm", "10µm", "500nm", "10nm", "0.1nm"];
const arrayPhotonSpectrumNames = ["Radio", "Microwave", "Infrared", "Visible", "Ultraviolet", "X-ray"];
for (let i = 0; i < 6; i++) {
    drawPhoton(canvasPhotonSpectrum, i * 0.05 + 0.1, i * 210 + 21, 90, 175);
    canvasPhotonSpectrum.fillText(arrayPhotonSpectrumWavelengths[i], i * 210 + 115, 205);
    canvasPhotonSpectrum.fillText(arrayPhotonSpectrumNames[i], i * 210 + 115, 245);
}


const canvasPhotonPower = initializeCanvas("canvasPhotonPower", 300);
const canvasPhotonPowerSPD = initializeCanvas("canvasPhotonPowerSPD", 300);
var sliderPhotonPowerWavelength = [];
var arrayPhotonPowerNumber = new Array(126).fill(0);
for (let i = 0; i < 5; i++) {
    sliderPhotonPowerWavelength[i] = document.getElementById(`sliderPhotonPowerWavelength${i}`);
    initializeSliders(sliderPhotonPowerWavelength[i], 0, 5, 1, 5);
    sliderPhotonPowerWavelength[i].addEventListener("input", updatePhotonPower);
}
function updatePhotonPower() {
    canvasPhotonPower.clearRect(0, 0, WIDTH, 300);
    for (let i = 0; i < 5; i++) {
        arrayPhotonPowerNumber[i * 18 + 26] = sliderPhotonPowerWavelength[i].value / (5 + i);
        for (let j = 0; j < sliderPhotonPowerWavelength[i].value; j++)
            drawPhoton(canvasPhotonPower, 0.3 - i * 0.05, (j * 510 + i * 100) % 1100 + 15, (i * 310 + j * 20) % 200 + 50);
    }
    canvasPhotonPowerSPD.clearRect(0, 0, WIDTH, 300);
    drawSPD(canvasPhotonPowerSPD, arrayPhotonPowerNumber);
}
updatePhotonPower();


const canvasSPDSun = initializeCanvas("canvasSPDSun", 300);
canvasSPDSun.canvas.height = 300;
drawSPD(canvasSPDSun, arraySPDSun);


const canvasSensitivityCurves = initializeCanvas("canvasSensitivityCurves", 300);
drawSSC(canvasSensitivityCurves, [COLORR].concat(LMSCOLORS), [RODMEANS].concat(LMSMEANS), [RODDEVNS].concat(LMSDEVNS), [1, 1, 1, 1]);
initializeCanvasText(canvasSensitivityCurves, COLORR, "left");
canvasSensitivityCurves.fillText("Rods", 660, 165);
canvasSensitivityCurves.fillStyle = COLORL;
canvasSensitivityCurves.fillText("L cones", 1090, 165);
canvasSensitivityCurves.fillStyle = COLORM;
canvasSensitivityCurves.fillText("M cones", 860, 165);
canvasSensitivityCurves.fillStyle = COLORS;
canvasSensitivityCurves.fillText("S cones", 60, 165);


const canvasSimpleSPD = initializeCanvas("canvasSimpleSPD", 300);
const canvasSimpleSSC = initializeCanvas("canvasSimpleSSC", 300);
const canvasSimpleRSP = initializeCanvas("canvasSimpleRSP", 200);
const sliderSimpleWavelength = document.getElementById("sliderSimpleWavelength");
initializeSliders(sliderSimpleWavelength, 0, 125, 1, 18);
var arraySimpleSPD = new Array(126).fill(0);
var varSimplePrevWavelength = 0;
sliderSimpleWavelength.addEventListener("input", updateSimple);
drawSSC(canvasSimpleSSC);
function updateSimple() {
    canvasSimpleSPD.clearRect(0, 0, WIDTH, 300);
    canvasSimpleRSP.clearRect(0, 0, WIDTH, 200);
    arraySimpleSPD[varSimplePrevWavelength] = 0;
    varSimplePrevWavelength = sliderSimpleWavelength.value;
    arraySimpleSPD[varSimplePrevWavelength] = 1;
    drawSPD(canvasSimpleSPD, arraySimpleSPD);
    drawRSP(canvasSimpleRSP, arraySimpleSPD);
}
updateSimple();


const canvasSimpleColorSPD = initializeCanvas("canvasSimpleColorSPD", 300);
const canvasSimpleColorSSC = initializeCanvas("canvasSimpleColorSSC", 300);
const canvasSimpleColorRSP = initializeCanvas("canvasSimpleColorRSP", 200);
const sliderSimpleColorWavelength = document.getElementById("sliderSimpleColorWavelength");
const divSimpleColor = document.getElementById("divSimpleColor");
initializeSliders(sliderSimpleColorWavelength, 0, 125, 1, 18);
var arraySimpleColorSPD = new Array(126).fill(0);
var arraySimpleColorRSP = [0, 0, 0];
var varSimpleColorPrevWavelength = 0;
sliderSimpleColorWavelength.addEventListener("input", updateSimpleColor);
drawSSC(canvasSimpleColorSSC);
function updateSimpleColor() {
    canvasSimpleColorSPD.clearRect(0, 0, WIDTH, 300);
    canvasSimpleColorRSP.clearRect(0, 0, WIDTH, 200);
    arraySimpleColorSPD[varSimpleColorPrevWavelength] = 0;
    varSimpleColorPrevWavelength = sliderSimpleColorWavelength.value;
    arraySimpleColorSPD[varSimpleColorPrevWavelength] = 1;
    drawSPD(canvasSimpleColorSPD, arraySimpleColorSPD);
    arraySimpleColorRSP = drawRSP(canvasSimpleColorRSP, arraySimpleColorSPD);
    colorBoxRGB(divSimpleColor, vectorMultiply(MATRIX_LMS_SRGB, arraySimpleColorRSP));
    divSimpleColor.innerHTML = getNameWavelength(divSimpleColor, varSimpleColorPrevWavelength * 2.8 + 380);
}
updateSimpleColor();


const canvasRodsLightSPD = initializeCanvas("canvasRodsLightSPD", 300);
const canvasRodsLightSSC = initializeCanvas("canvasRodsLightSSC", 300);
const canvasRodsLightRSP = initializeCanvas("canvasRodsLightRSP", 250);
const sliderRodsLightWavelength = document.getElementById("sliderRodsLightWavelength");
const divRodsLight = document.getElementById("divRodsLight");
initializeSliders(sliderRodsLightWavelength, 0, 125, 1, 18);
var arrayRodsLightSPD = new Array(126).fill(0);
var arrayRodsLightRSP = [0, 0, 0];
var varRodsLightPrevWavelength = 0;
sliderRodsLightWavelength.addEventListener("input", updateRodsLight);
drawSSC(canvasRodsLightSSC, [COLORR].concat(LMSCOLORS), [RODMEANS].concat(LMSMEANS), [RODDEVNS].concat(LMSDEVNS), [1, 0.15, 0.15, 0.15]);
function updateRodsLight() {
    canvasRodsLightSPD.clearRect(0, 0, WIDTH, 300);
    canvasRodsLightRSP.clearRect(0, 0, WIDTH, 250);
    arrayRodsLightSPD[varRodsLightPrevWavelength] = 0;
    varRodsLightPrevWavelength = sliderRodsLightWavelength.value;
    arrayRodsLightSPD[varRodsLightPrevWavelength] = 1;
    drawSPD(canvasRodsLightSPD, arrayRodsLightSPD);
    arrayRodsLightRSP = drawRSP(canvasRodsLightRSP, arrayRodsLightSPD, LMSCOLORS.concat(COLORR), LMSMEANS.concat(RODMEANS), LMSDEVNS.concat(RODDEVNS), [1, 1, 1, 9900], LMSNORMS.concat(RODNORMS), CONES.concat("R"));
    colorBoxRGB(divRodsLight, vectorMultiply(MATRIX_LMS_SRGB, arrayRodsLightRSP.slice(0, 3)));
}
updateRodsLight();


const canvasRodsDarkSPD = initializeCanvas("canvasRodsDarkSPD", 300);
const canvasRodsDarkSSC = initializeCanvas("canvasRodsDarkSSC", 300);
const canvasRodsDarkRSP = initializeCanvas("canvasRodsDarkRSP", 250);
const canvasRodsDarkBAR = initializeCanvas("canvasRodsDarkBAR", 50);
const sliderRodsDarkWavelength = document.getElementById("sliderRodsDarkWavelength");
const sliderRodsDarkSensitivityOverlap = document.getElementById("sliderRodsDarkSensitivityOverlap");
const divRodsDarkBox = document.getElementById("divRodsDarkBox");
const linkRodsDarkWavelengthA = document.getElementById("linkRodsDarkWavelengthA");
const linkRodsDarkWavelengthB = document.getElementById("linkRodsDarkWavelengthB");
initializeSliders(sliderRodsDarkWavelength, 0, 125, 1, 18);
var arrayRodsDarkSPD = new Array(126).fill(0);
var arrayRodsDarkRSP = [0, 0, 0, 0];
var arrayRodsDarkROD = [0, 0, 0];
var varRodsDarkPrevWavelength = 0;
sliderRodsDarkWavelength.addEventListener("input", updateRodsDark);
linkRodsDarkWavelengthA.addEventListener("click", () => { sliderRodsDarkWavelength.value = 40; updateRodsDark(); });
linkRodsDarkWavelengthB.addEventListener("click", () => { sliderRodsDarkWavelength.value = 56; updateRodsDark(); });
drawSSC(canvasRodsDarkSSC, [COLORR].concat(LMSCOLORS), [RODMEANS].concat(LMSMEANS), [RODDEVNS].concat(LMSDEVNS), [1, 0.15, 0.15, 0.15]);
drawSpectralBar(canvasRodsDarkBAR, [RODMEANS, RODMEANS, RODMEANS], [RODDEVNS, RODDEVNS, RODDEVNS], 0.75);
function updateRodsDark() {
    canvasRodsDarkSPD.clearRect(0, 0, WIDTH, 300);
    canvasRodsDarkRSP.clearRect(0, 0, WIDTH, 250);
    arrayRodsDarkSPD[varRodsDarkPrevWavelength] = 0;
    varRodsDarkPrevWavelength = sliderRodsDarkWavelength.value;
    arrayRodsDarkSPD[varRodsDarkPrevWavelength] = 0.1;
    drawSPD(canvasRodsDarkSPD, arrayRodsDarkSPD);
    arrayRodsDarkRSP = drawRSP(canvasRodsDarkRSP, arrayRodsDarkSPD, LMSCOLORS.concat(COLORR), LMSMEANS.concat(RODMEANS), LMSDEVNS.concat(RODDEVNS), [0.01, 0.01, 0.01, 10], LMSNORMS.concat(RODNORMS), CONES.concat("R"));
    arrayRodsDarkROD.fill(arrayRodsDarkRSP[3] * 0.75);
    colorBoxRGB(divRodsDarkBox, vectorMultiply(MATRIX_LMS_SRGB, arrayRodsDarkROD));
}
updateRodsDark();


const canvasBlindSPD = initializeCanvas("canvasBlindSPD", 300);
const canvasBlindSSC = initializeCanvas("canvasBlindSSC", 300);
const canvasBlindRSP = initializeCanvas("canvasBlindRSP", 200);
const canvasBlindBAR = initializeCanvas("canvasBlindBAR", 50);
const sliderBlindWavelength = document.getElementById("sliderBlindWavelength");
const sliderBlindSensitivityOverlap = document.getElementById("sliderBlindSensitivityOverlap");
const divBlindBox = document.getElementById("divBlindBox");
const linkBlindWavelengthA = document.getElementById("linkBlindWavelengthA");
const linkBlindWavelengthB = document.getElementById("linkBlindWavelengthB");
initializeSliders(sliderBlindWavelength, 0, 125, 1, 18);
initializeSliders(sliderBlindSensitivityOverlap, LMSMEANS[1], LMSMEANS[0], 0.1, LMSMEANS[0]);
var arrayBlindSPD = new Array(126).fill(0);
var arrayBlindRSP = [0, 0, 0];
var varBlindPrevWavelength = 0;
sliderBlindWavelength.addEventListener("input", updateBlind);
sliderBlindSensitivityOverlap.addEventListener("input", updateBlindSensitivity);
linkBlindWavelengthA.addEventListener("click", () => { sliderBlindWavelength.value = 62; updateBlind(); });
linkBlindWavelengthB.addEventListener("click", () => { sliderBlindWavelength.value = 80; updateBlind(); });
function updateBlind() {
    canvasBlindSPD.clearRect(0, 0, WIDTH, 300);
    canvasBlindRSP.clearRect(0, 0, WIDTH, 200);
    arrayBlindSPD[varBlindPrevWavelength] = 0;
    varBlindPrevWavelength = sliderBlindWavelength.value;
    arrayBlindSPD[varBlindPrevWavelength] = 1;
    drawSPD(canvasBlindSPD, arrayBlindSPD);
    arrayBlindRSP = drawRSP(canvasBlindRSP, arrayBlindSPD, LMSCOLORS, [LMSMEANS[0], sliderBlindSensitivityOverlap.value, LMSMEANS[2]]);
    colorBoxRGB(divBlindBox, vectorMultiply(MATRIX_LMS_SRGB, arrayBlindRSP));
}
function updateBlindSensitivity() {
    canvasBlindSSC.clearRect(0, 0, WIDTH, 300);
    drawSSC(canvasBlindSSC, LMSCOLORS, [LMSMEANS[0], sliderBlindSensitivityOverlap.value, LMSMEANS[2]]);
    drawSpectralBar(canvasBlindBAR, [LMSMEANS[0], sliderBlindSensitivityOverlap.value, LMSMEANS[2]]);
    updateBlind();
}
updateBlindSensitivity();


const canvasBlindBARNR = initializeCanvas("canvasBlindBARNR", 50);
const canvasBlindBARPP = initializeCanvas("canvasBlindBARPP", 50);
const canvasBlindBARDP = initializeCanvas("canvasBlindBARDP", 50);
const canvasBlindBARTP = initializeCanvas("canvasBlindBARTP", 50);
drawSpectralBar(canvasBlindBARNR);
drawSpectralBar(canvasBlindBARPP, [LMSMEANS[1], LMSMEANS[1], LMSMEANS[2]]);
drawSpectralBar(canvasBlindBARDP, [LMSMEANS[0], LMSMEANS[0], LMSMEANS[2]]);
drawSpectralBar(canvasBlindBARTP, [LMSMEANS[0], LMSMEANS[1], LMSMEANS[0]], [LMSDEVNS[0], LMSDEVNS[1], LMSDEVNS[1]]);


const canvasNonSpectralSPD = initializeCanvas("canvasNonSpectralSPD", 300);
const canvasNonSpectralSSC = initializeCanvas("canvasNonSpectralSSC", 300);
const canvasNonSpectralRSP = initializeCanvas("canvasNonSpectralRSP", 200);
const divNonSpectral = document.getElementById("divNonSpectral");
const linkNonSpectralSPDGrey = document.getElementById("linkNonSpectralSPDGrey");
const linkNonSpectralSPDOlive = document.getElementById("linkNonSpectralSPDOlive");
const linkNonSpectralSPDPink = document.getElementById("linkNonSpectralSPDPink");
const linkNonSpectralSPDPurple = document.getElementById("linkNonSpectralSPDPurple");
var arrayNonSpectralSPD = new Array(126).fill(0);
var arrayNonSpectralRSP = [0, 0, 0];
var varNonSpectralMousedown = false;
drawSSC(canvasNonSpectralSSC);
linkNonSpectralSPDGrey.addEventListener("click", () => { arrayNonSpectralSPD = [...arraySPDGrey]; updateNonSpectral(); });
linkNonSpectralSPDOlive.addEventListener("click", () => { arrayNonSpectralSPD = [...arraySPDOlive]; updateNonSpectral(); });
linkNonSpectralSPDPink.addEventListener("click", () => { arrayNonSpectralSPD = [...arraySPDPink]; updateNonSpectral(); });
linkNonSpectralSPDPurple.addEventListener("click", () => { arrayNonSpectralSPD = [...arraySPDPurple]; updateNonSpectral(); });
canvasNonSpectralSPD.canvas.addEventListener("mousedown", () => { varNonSpectralMousedown = true; }); // unfortunately
canvasNonSpectralSPD.canvas.addEventListener("mouseup", () => { varNonSpectralMousedown = false; });  // idk a better way
canvasNonSpectralSPD.canvas.addEventListener("mouseout", () => { varNonSpectralMousedown = false; });
canvasNonSpectralSPD.canvas.addEventListener("mousemove", (evt) => {
    if (varNonSpectralMousedown) {
        getSPD(canvasNonSpectralSPD.canvas, arrayNonSpectralSPD, evt);
        updateNonSpectral(); } });
function updateNonSpectral() {
    canvasNonSpectralSPD.clearRect(0, 0, WIDTH, 300);
    canvasNonSpectralRSP.clearRect(0, 0, WIDTH, 200);
    drawSPD(canvasNonSpectralSPD, arrayNonSpectralSPD);
    arrayNonSpectralRSP = drawRSP(canvasNonSpectralRSP, arrayNonSpectralSPD);
    colorBoxRGB(divNonSpectral, vectorMultiply(MATRIX_LMS_SRGB, arrayNonSpectralRSP));
}
updateNonSpectral();


const canvasColorMatchingCMF = initializeCanvas("canvasColorMatchingCMF", 330);
const canvasColorMatchingSPD = initializeCanvas("canvasColorMatchingSPD", 330);
const canvasColorMatchingSSC = initializeCanvas("canvasColorMatchingSSC", 300);
const canvasColorMatchingRSP = initializeCanvas("canvasColorMatchingRSP", 200);
const sliderColorMatchingWavelength = document.getElementById("sliderColorMatchingWavelength");
const linkColorMatchingWavelengthA = document.getElementById("linkColorMatchingWavelengthA");
const divColorMatching = document.getElementById("divColorMatching");
initializeSliders(sliderColorMatchingWavelength, 0, 125, 1, 18);
var arrayColorMatchingSPD = new Array(126).fill(0);
var arrayColorMatchingRSP = [0, 0, 0];
var varColorMatchingPrevWavelength = 0;
sliderColorMatchingWavelength.addEventListener("input", updateColorMatching);
linkColorMatchingWavelengthA.addEventListener("click", () => { sliderColorMatchingWavelength.value = 43; updateColorMatching(); });
drawSSC(canvasColorMatchingSSC);
function updateColorMatching() {
    canvasColorMatchingCMF.clearRect(0, 0, WIDTH, 330);
    canvasColorMatchingSPD.clearRect(0, 0, WIDTH, 330);
    canvasColorMatchingRSP.clearRect(0, 0, WIDTH, 200);
    getCMFSPD(sliderColorMatchingWavelength.value, arrayColorMatchingSPD);
    drawCMF(canvasColorMatchingCMF, sliderColorMatchingWavelength.value);
    drawLabels(canvasColorMatchingCMF, CMFLABELS, CMFLABELPOS);
    drawSPD(canvasColorMatchingSPD, arrayColorMatchingSPD);
    arrayColorMatchingRSP = drawRSP(canvasColorMatchingRSP, arrayColorMatchingSPD, LMSCOLORS, LMSMEANS, LMSDEVNS, LMSMAGNS, LMSNORMS, CONES, 5);
    colorBoxRGB(divColorMatching, vectorMultiply(MATRIX_LMS_SRGB, arrayColorMatchingRSP));
}
updateColorMatching();


const canvasMetamerSPD = initializeCanvas("canvasMetamerSPD", 300);
const canvasMetamerSSC = initializeCanvas("canvasMetamerSSC", 300);
const canvasMetamerRSP = initializeCanvas("canvasMetamerRSP", 200);
const linkMetamerDistributionX = document.getElementById("linkMetamerDistributionX");
const linkMetamerDistributionA = document.getElementById("linkMetamerDistributionA");
const linkMetamerDistributionB = document.getElementById("linkMetamerDistributionB");
const divMetamer = document.getElementById("divMetamer");
const arrayMetamerSPDX = new Array(126).fill(0);
const arrayMetamerSPDA = new Array(126).fill(0);
const arrayMetamerSPDB = new Array(126).fill(0);
for (let i = 82; i < 112; i++) arrayMetamerSPDX[i] = 0.28;
arrayMetamerSPDA[90] = 0.2; arrayMetamerSPDA[100] = 0.205;
arrayMetamerSPDB[80] = 0.1; arrayMetamerSPDB[109] = 0.53;
var arrayMetamerSPD = [...arrayMetamerSPDX];
var arrayMetamerRSP = [0, 0, 0];
var varMetamerMousedown = false;
drawSSC(canvasMetamerSSC);
linkMetamerDistributionX.addEventListener("click", () => { arrayMetamerSPD = [...arrayMetamerSPDX]; updateMetamer(); });
linkMetamerDistributionA.addEventListener("click", () => { arrayMetamerSPD = [...arrayMetamerSPDA]; updateMetamer(); });
linkMetamerDistributionB.addEventListener("click", () => { arrayMetamerSPD = [...arrayMetamerSPDB]; updateMetamer(); });
function updateMetamer() {
    canvasMetamerSPD.clearRect(0, 0, WIDTH, 300);
    canvasMetamerRSP.clearRect(0, 0, WIDTH, 200);
    drawSPD(canvasMetamerSPD, arrayMetamerSPD);
    arrayMetamerRSP = drawRSP(canvasMetamerRSP, arrayMetamerSPD);
    colorBoxRGB(divMetamer, vectorMultiply(MATRIX_LMS_SRGB, arrayMetamerRSP));
}
updateMetamer();


const canvasColorSpaceLMS = initializeCanvas("canvasColorSpaceLMS", 600);
const divColorSpaceLMS = document.getElementById("divColorSpaceLMS");
const sliderColorSpaceLMSL = document.getElementById("sliderColorSpaceLMSL");
const sliderColorSpaceLMSM = document.getElementById("sliderColorSpaceLMSM");
const sliderColorSpaceLMSS = document.getElementById("sliderColorSpaceLMSS");
const linkColorSpaceLMSImp = document.getElementById("linkColorSpaceLMSImp");
var arrayColorSpaceLMSRSP = [0, 0, 0];
initializeSliders(sliderColorSpaceLMSL, 0, 1, 0.025, 0.7);
initializeSliders(sliderColorSpaceLMSM, 0, 1, 0.025, 0.7);
initializeSliders(sliderColorSpaceLMSS, 0, 1, 0.025, 0.5);
sliderColorSpaceLMSL.addEventListener("input", updateColorSpaceLMS);
sliderColorSpaceLMSM.addEventListener("input", updateColorSpaceLMS);
sliderColorSpaceLMSS.addEventListener("input", updateColorSpaceLMS);
linkColorSpaceLMSImp.addEventListener("click", () => {
    sliderColorSpaceLMSL.value = 0;
    sliderColorSpaceLMSM.value = 0.7;
    sliderColorSpaceLMSS.value = 0;
    updateColorSpaceLMS(); });
function updateColorSpaceLMS() {
    canvasColorSpaceLMS.clearRect(0, 0, WIDTH, 600);
    arrayColorSpaceLMSRSP = [sliderColorSpaceLMSL.value, sliderColorSpaceLMSM.value, sliderColorSpaceLMSS.value];
    drawSpaceAxes(canvasColorSpaceLMS);
    drawSpacePlane(canvasColorSpaceLMS, arrayColorSpaceLMSRSP, LMStoRGBClip);
    drawSpaceCube(canvasColorSpaceLMS);
    drawSpacePoint(canvasColorSpaceLMS, arrayColorSpaceLMSRSP);
    drawSpaceLabels(canvasColorSpaceLMS, CONES);
    colorBoxRGB(divColorSpaceLMS, LMStoRGBClip(arrayColorSpaceLMSRSP));
}
updateColorSpaceLMS();


const canvasColorSpaceRGB = initializeCanvas("canvasColorSpaceRGB", 600);
const divColorSpaceRGB = document.getElementById("divColorSpaceRGB");
const sliderColorSpaceRGBR = document.getElementById("sliderColorSpaceRGBR");
const sliderColorSpaceRGBG = document.getElementById("sliderColorSpaceRGBG");
const sliderColorSpaceRGBB = document.getElementById("sliderColorSpaceRGBB");
var arrayColorSpaceRGBRSP = [0, 0, 0];
initializeSliders(sliderColorSpaceRGBR, 0, 1, 0.025, 0.2);
initializeSliders(sliderColorSpaceRGBG, 0, 1, 0.025, 0.7);
initializeSliders(sliderColorSpaceRGBB, 0, 1, 0.025, 0.5);
sliderColorSpaceRGBR.addEventListener("input", updateColorSpaceRGB);
sliderColorSpaceRGBG.addEventListener("input", updateColorSpaceRGB);
sliderColorSpaceRGBB.addEventListener("input", updateColorSpaceRGB);
function updateColorSpaceRGB() {
    canvasColorSpaceRGB.clearRect(0, 0, WIDTH, 600);
    arrayColorSpaceRGBRSP = [sliderColorSpaceRGBR.value, sliderColorSpaceRGBG.value, sliderColorSpaceRGBB.value];
    drawSpaceAxes(canvasColorSpaceRGB);
    drawSpacePlane(canvasColorSpaceRGB, arrayColorSpaceRGBRSP);
    drawSpaceCube(canvasColorSpaceRGB);
    drawSpacePoint(canvasColorSpaceRGB, arrayColorSpaceRGBRSP);
    drawSpaceLabels(canvasColorSpaceRGB);
    colorBoxRGB(divColorSpaceRGB, arrayColorSpaceRGBRSP);
}
updateColorSpaceRGB();


const canvasColorSpaceRGBLocus = initializeCanvas("canvasColorSpaceRGBLocus", 600);
const canvasColorSpaceRGBLocusCMF = initializeCanvas("canvasColorSpaceRGBLocusCMF", 330);
const sliderColorSpaceRGBLocusWavelength = document.getElementById("sliderColorSpaceRGBLocusWavelength");
var arrayColorSpaceRGBLocusRSP = [0, 0, 0];
initializeSliders(sliderColorSpaceRGBLocusWavelength, 0, 125, 1, 18);
sliderColorSpaceRGBLocusWavelength.addEventListener("input", updateColorSpaceRGBLocus);
function updateColorSpaceRGBLocus() {
    canvasColorSpaceRGBLocus.clearRect(0, 0, WIDTH, 600);
    canvasColorSpaceRGBLocusCMF.clearRect(0, 0, WIDTH, 330);
    drawCMF(canvasColorSpaceRGBLocusCMF, sliderColorSpaceRGBLocusWavelength.value);
    drawLabels(canvasColorSpaceRGBLocusCMF, RGBPM, CMFLABELPOS);
    getCMFValues(sliderColorSpaceRGBLocusWavelength.value, arrayColorSpaceRGBLocusRSP);
    drawSpaceAxes(canvasColorSpaceRGBLocus);
    drawSpaceAxes(canvasColorSpaceRGBLocus, TRANSFMAT, [[-1, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1]]);
    drawSpaceCube(canvasColorSpaceRGBLocus);
    drawSpaceLocus(canvasColorSpaceRGBLocus);
    drawSpacePointLines(canvasColorSpaceRGBLocus, arrayColorSpaceRGBLocusRSP)
    drawSpacePoint(canvasColorSpaceRGBLocus, arrayColorSpaceRGBLocusRSP);
    drawSpaceLabels(canvasColorSpaceRGBLocus);
}
updateColorSpaceRGBLocus();


const canvasColorSpaceTransformCMF = initializeCanvas("canvasColorSpaceTransformCMF", 330);
const canvasColorSpaceTransform = initializeCanvas("canvasColorSpaceTransform", 600);
const linkColorSpaceTransformMat = document.getElementById("linkColorSpaceTransformMat");
var arrayColorSpaceTransformBasis = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
var arrayColorSpaceTransformMatrix = [[0, 0, 0, 0], [0, 0, 0, 0]];
var arrayColorSpaceTransformCMF = new Array(3).fill(0).map(() => new Array(126).fill(0));
var sliderColorSpaceTransform = [];
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        sliderColorSpaceTransform[3 * i + j] = document.getElementById(`sliderColorSpaceTransform${i * 3 + j}`);
        initializeSliders(sliderColorSpaceTransform[i * 3 + j], -1, 2, 0.01, IDENTITY[i][j]);
        sliderColorSpaceTransform[3 * i + j].addEventListener("input", updateColorSpaceTransform);
    }
}
linkColorSpaceTransformMat.addEventListener("click", () => {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            sliderColorSpaceTransform[3 * i + j].value = MATRIX_RGB_XYZ[i][j];
    updateColorSpaceTransform(); });
function updateColorSpaceTransform() {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            arrayColorSpaceTransformBasis[i][j] = sliderColorSpaceTransform[i * 3 + j].value;
    arrayColorSpaceTransformMatrix = matrixMultiply(TRANSFMAT, arrayColorSpaceTransformBasis);
    getCMFTransform(arrayColorSpaceTransformBasis, arrayColorSpaceTransformCMF);
    canvasColorSpaceTransform.clearRect(0, 0, WIDTH, 600);
    canvasColorSpaceTransformCMF.clearRect(0, 0, WIDTH, 330);
    drawCMF(canvasColorSpaceTransformCMF, 0, arrayColorSpaceTransformCMF);
    drawSpaceAxes(canvasColorSpaceTransform);
    drawSpaceAxes(canvasColorSpaceTransform, TRANSFMAT, [[-1, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1]]);
    drawSpaceCube(canvasColorSpaceTransform);
    drawSpaceCube(canvasColorSpaceTransform, arrayColorSpaceTransformMatrix, CUBEPOINTS, true);
    drawSpaceLocus(canvasColorSpaceTransform, arrayCOLMATRGB, arrayColorSpaceTransformMatrix);
    drawSpaceLabels(canvasColorSpaceTransform, RGBPM, arrayColorSpaceTransformMatrix);
    drawSpaceMatrix(canvasColorSpaceTransform, arrayColorSpaceTransformBasis);
}
updateColorSpaceTransform();


const canvasColorSpaceXYZLocus = initializeCanvas("canvasColorSpaceXYZLocus", 600);
const canvasColorSpaceXYZLocusCMF = initializeCanvas("canvasColorSpaceXYZLocusCMF", 330);
const sliderColorSpaceXYZLocusWavelength = document.getElementById("sliderColorSpaceXYZLocusWavelength");
var arrayColorSpaceXYZLocusRSP = [0, 0, 0];
initializeSliders(sliderColorSpaceXYZLocusWavelength, 0, 125, 1, 18);
sliderColorSpaceXYZLocusWavelength.addEventListener("input", updateColorSpaceXYZLocus);
function updateColorSpaceXYZLocus() {
    canvasColorSpaceXYZLocus.clearRect(0, 0, WIDTH, 600);
    canvasColorSpaceXYZLocusCMF.clearRect(0, 0, WIDTH, 330);
    drawCMF(canvasColorSpaceXYZLocusCMF, sliderColorSpaceXYZLocusWavelength.value, arrayCOLMATXYZ);
    drawLabels(canvasColorSpaceXYZLocusCMF, XYZPM, [[920, 131], [500, 131], [130, 131]]);
    getCMFValues(sliderColorSpaceXYZLocusWavelength.value, arrayColorSpaceXYZLocusRSP, arrayCOLMATXYZ);
    drawSpaceAxes(canvasColorSpaceXYZLocus);
    drawSpaceCube(canvasColorSpaceXYZLocus);
    drawSpaceLocus(canvasColorSpaceXYZLocus, arrayCOLMATXYZ);
    drawSpacePointLines(canvasColorSpaceXYZLocus, arrayColorSpaceXYZLocusRSP)
    drawSpacePoint(canvasColorSpaceXYZLocus, arrayColorSpaceXYZLocusRSP);
    drawSpaceLabels(canvasColorSpaceXYZLocus, XYZPM);
}
updateColorSpaceXYZLocus();


const canvasColorSpaceRGBChroma = initializeCanvas("canvasColorSpaceRGBChroma", 600);
const divColorSpaceRGBChroma = document.getElementById("divColorSpaceRGBChroma");
var sliderColorSpaceRGBChroma = [];
var progressColorSpaceRGBChroma = [];
for (let i = 0; i < 3; i++) {
    sliderColorSpaceRGBChroma[i] = document.getElementById(`sliderColorSpaceRGBChroma${i}`);
    progressColorSpaceRGBChroma[i] = document.getElementById(`progressColorSpaceRGBChroma${i}`);
    initializeSliders(sliderColorSpaceRGBChroma[i], 0.01, 0.98, 0.01, 0.33);
    initializeProgressBar(progressColorSpaceRGBChroma[i], 0.98, 0.33);
    sliderColorSpaceRGBChroma[i].addEventListener("input", () => { normalizeSliders(sliderColorSpaceRGBChroma, i); updateColorSpaceRGBChroma();});
}
var arrayColorSpaceRGBChromaRSP = [0, 0, 0];
function updateColorSpaceRGBChroma() {
    canvasColorSpaceRGBChroma.clearRect(0, 0, WIDTH, 600);
    arrayColorSpaceRGBChromaRSP = [sliderColorSpaceRGBChroma[0].value, sliderColorSpaceRGBChroma[1].value, sliderColorSpaceRGBChroma[2].value];
    arrayColorSpaceRGBChromaRSP.forEach((val, i) => progressColorSpaceRGBChroma[i].value = val);
    drawSpaceAxes(canvasColorSpaceRGBChroma);
    drawSpaceSlice(canvasColorSpaceRGBChroma);
    drawSpaceTriangle(canvasColorSpaceRGBChroma);
    drawSpaceCube(canvasColorSpaceRGBChroma);
    drawSpacePoint(canvasColorSpaceRGBChroma, arrayColorSpaceRGBChromaRSP);
    drawSpaceLabels(canvasColorSpaceRGBChroma);
    colorBoxRGB(divColorSpaceRGBChroma, arrayColorSpaceRGBChromaRSP);
}
updateColorSpaceRGBChroma();



// functions

function normalizeSliders(sliderArray, i) {
    let norm = (1 - sliderArray[i].value) / (Number(sliderArray[(i + 1) % 3].value) + Number(sliderArray[(i + 2) % 3].value));
    sliderArray[(i + 1) % 3].value *= norm;
    sliderArray[(i + 2) % 3].value *= norm;
}

function drawSpaceMatrix(canvas, matrix, offsetX = 861, offsetY = 151, color = "#000", width = 2) {
    let bracketX = [[-45, -60], [245, 260]];
    let bracketY = [-40, 136];
    let labels = [];
    let coordinates = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            labels.push(Number(matrix[i][j]).toFixed(2));
            coordinates.push([j * 100 + offsetX, i * 50 + offsetY]);
        }
    }
    drawLabels(canvas, labels, coordinates, color);
    for (let i = 0; i < 2; i++) {
        canvas.moveTo(offsetX + bracketX[i][0], offsetY + bracketY[0]);
        canvas.lineTo(offsetX + bracketX[i][1], offsetY + bracketY[0]);
        canvas.lineTo(offsetX + bracketX[i][1], offsetY + bracketY[1]);
        canvas.lineTo(offsetX + bracketX[i][0], offsetY + bracketY[1]);
    } canvas.stroke();
}

function drawSpaceLabels(canvas, labels = RGBPM, transformation = TRANSFMAT, offsets = CUBELABELOFF, endpoints = CUBELABELPOS, color = "#000") {
    let coordinates = [];
    let vertex = [];
    for (let i = 0; i < labels.length; i++) {
        vertex = [0, 0, 0, 0.95];
        vertex[i] = endpoints[i]
        vertex[3] = offsets[i];
        coordinates.push(vectorMultiply(transformation, vertex));
    }
    drawLabels(canvas, labels, coordinates, color);
}

function drawSpaceLocus(canvas, locus = arrayCOLMATRGB, transformation = TRANSFMAT, color = "#000", width = 2) {
    let coordinates = [0, 0, 0, 1];
    let points = vectorMultiply(transformation, coordinates);
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.beginPath();
    canvas.moveTo(points[0], points[1]);
    for (let i = 0; i < locus[0].length; i++) {
        coordinates = [locus[0][i], locus[1][i], locus[2][i], 1];
        points = vectorMultiply(transformation, coordinates);
        canvas.lineTo(points[0], points[1]);
    }
    canvas.stroke();
}

function drawSpaceTriangle(canvas, k = 1, transformation = TRANSFMAT, color = "#000", width = 2) {
    let points = [[k, 0, 0, 1], [0, k, 0, 1], [0, 0, k, 1], [k, 0, 0, 1]];
    let vertex = vectorMultiply(transformation, points[0]);
    canvas.strokeStyle = color;
    canvas.lineWidth = width;
    canvas.beginPath();
    canvas.moveTo(vertex[0], vertex[1]);
    for (let i = 1; i < points.length; i++) {
        vertex = vectorMultiply(transformation, points[i]);
        canvas.lineTo(vertex[0], vertex[1]);
    }
    canvas.stroke();
}

function drawSpaceSlice(canvas, k = 2, transformation = TRANSFMAT) {
    const resolution = 1 / 50;
    let vertex = [0, 0, 0, 1];
    let points = [0, 0];
    let color = [0, 0, 0];
    for (let r = 0; r < 1; r += resolution) {
        for (let g = 0; g < 1; g += resolution) {
            if (r + g > 1) continue;
            vertex[0] = color[0] = k * r;
            vertex[1] = color[1] = k * g;
            vertex[2] = color[2] = k * (1 - r - g);
            point = vectorMultiply(transformation, vertex);
            canvas.fillStyle = getColor(color);
            canvas.fillRect(point[0], point[1], 5, 5);
        }
    }
}

function drawSpacePlane(canvas, values, colorTransform = identityTransform, transformation = TRANSFMAT) {
    const iterationsX = [16, 40, 40];
    const iterationsY = [40, 16, 40];
    const weights = [[[-7.5, 0], [5, 10]], [[10, -7.8125], [0, -5]], [[0, 10], [-10, 0]]];
    const bias = [[-6, -4], [0, 2], [2, -8]];
    const sizes = [[4, 7], [6, 3], [6, 6]];
    let vertex = [0, 0, 0, 1];
    let color = [0, 0, 0];
    for (let i = 0; i < 3 ; i++) {
        color[i] = values[i];
        vertex = [0, 0, 0, 1]; vertex[i] = values[i]; vertex = vectorMultiply(transformation, vertex);
        for (let x = 0; x < iterationsX[i]; x++) {
            for (let y = 0; y < iterationsY[i]; y++) {
                color[(i + 1) % 3] = y / iterationsY[i];
                color[(i + 2) % 3] = x / iterationsX[i];
                canvas.fillStyle = getColor(colorTransform(color));
                canvas.fillRect(vertex[0] + x * weights[i][0][0] + y * weights[i][0][1] + bias[i][0], vertex[1] + x * weights[i][1][0] - y * weights[i][1][1] + bias[i][1], sizes[i][0], sizes[i][1]);
            }
        }
    }
}

function LMStoRGBClip(lmsArray) {
    let rgb = vectorMultiply(MATRIX_LMS_SRGB, lmsArray);
    if (rgb[0] > 1 || rgb[1] > 1.1 || rgb[2] > 1) rgb[0] = rgb[1] = rgb[2] = 0;
    if (rgb[0] < 0 || rgb[1] < 0 || rgb[2] < 0) rgb[0] = rgb[1] = rgb[2] = 0;
    return rgb;
}

function drawSpaceCube(canvas, transformation = TRANSFMAT, oppVertex = CUBEPOINTS, inner = false, color = "#999", width = 2) {
    let verticesShell = [[oppVertex[0], 0, 0, 1], [oppVertex[0], oppVertex[1], 0, 1], [0, oppVertex[1], 0, 1], [0, oppVertex[1], oppVertex[2], 1], [0, 0, oppVertex[2], 1], [oppVertex[0], 0, oppVertex[2], 1], [oppVertex[0], 0, 0, 1]];
    let vertexOpp = [0, 0, 0, 0];
    let vertex = vectorMultiply(transformation, verticesShell[0]);
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.beginPath();
    canvas.moveTo(vertex[0], vertex[1]);
    for (let i = 1; i < verticesShell.length; i++) {
        vertex = vectorMultiply(transformation, verticesShell[i]);
        canvas.lineTo(vertex[0], vertex[1]);
    }
    for (let i = 0; i < 3; i++) {
        vertexOpp = oppVertex.concat(1);
        vertex = vectorMultiply(transformation, vertexOpp);
        canvas.moveTo(vertex[0], vertex[1]);
        vertexOpp[i] = 0;
        vertex = vectorMultiply(transformation, vertexOpp);
        canvas.lineTo(vertex[0], vertex[1]);
    }
    if (inner) {
        for (let i = 0; i < 3; i++) {
            vertex = vectorMultiply(transformation, [0, 0, 0, 1]);
            canvas.moveTo(vertex[0], vertex[1]);
            vertexOpp = [0, 0, 0, 1];
            vertexOpp[i] = oppVertex[i];
            vertex = vectorMultiply(transformation, vertexOpp);
            canvas.lineTo(vertex[0], vertex[1]);
        }
    }
    canvas.stroke();
}

function drawSpacePointLines(canvas, coordinates, transformation = TRANSFMAT, color = "#000", width = 6) {
    let points = vectorMultiply(transformation, coordinates.concat(1));
    let vertex = coordinates.concat(1);
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.beginPath();
    canvas.moveTo(points[0], points[1]);
    for (let i = 0; i < coordinates.length; i++) {
        vertex[i] = 0; points = vectorMultiply(transformation, vertex);
        canvas.lineTo(points[0], points[1]);
    }
    canvas.stroke();
}

function drawSpacePoint(canvas, coordinates, transformation = TRANSFMAT, color = "#000", radius = 8) {
    let coords = vectorMultiply(transformation, coordinates.concat(1));
    canvas.fillStyle = color;
    canvas.beginPath();
    canvas.arc(coords[0], coords[1], radius, 0, 2 * Math.PI);
    canvas.fill();
}

function drawSpaceAxes(canvas, transformation = TRANSFMAT, axes = BASEAXES, colors = LMSCOLORS, width = 2) {
    canvas.lineWidth = width;
    let origin = vectorMultiply(transformation, [0, 0, 0, 1]);
    let vertex;
    for (let c = 0; c < axes.length; c++) {
        canvas.strokeStyle = colors[c];
        canvas.beginPath();
        canvas.moveTo(origin[0], origin[1]);
        vertex = vectorMultiply(transformation, axes[c]);
        canvas.lineTo(vertex[0], vertex[1]);
        canvas.stroke();
    }
}

function drawLabels(canvas, labels, positions, color = "#000") {
    initializeCanvasText(canvas, color);
    for (let i = 0; i < labels.length; i++)
        canvas.fillText(labels[i], positions[i][0], positions[i][1]);
}

function getCMFTransform(matrix, transformedArray, cmfArray = arrayCOLMATRGB) {
    for (let i = 0; i < cmfArray[0].length; i++) {
        transformedArray[0][i] = matrix[0][0] * cmfArray[0][i] + matrix[0][1] * cmfArray[1][i] + matrix[0][2] * cmfArray[2][i];
        transformedArray[1][i] = matrix[1][0] * cmfArray[0][i] + matrix[1][1] * cmfArray[1][i] + matrix[1][2] * cmfArray[2][i];
        transformedArray[2][i] = matrix[2][0] * cmfArray[0][i] + matrix[2][1] * cmfArray[1][i] + matrix[2][2] * cmfArray[2][i];
    }
}

function getCMFValues(wavelength, values, cmfArray = arrayCOLMATRGB) {
    for (let i = 0; i < cmfArray.length; i++)
        values[i] = cmfArray[i][wavelength];
}

function getCMFSPD(wavelength, spdArray, cmfArray = arrayCOLMATRGB, cmfWavelengths = RGBWAVES) {
    for (let i = 0; i < cmfWavelengths.length; i++)
        spdArray[cmfWavelengths[i]] = Math.max(0.0001, cmfArray[i][wavelength]);
}

function getSPD(canvas, spdArray, evt) {
    const rect = canvas.getBoundingClientRect();
    let wavelengthBin = (evt.clientX - rect.left) * (canvas.width / rect.width);
    let intensity = (evt.clientY - rect.top) * (canvas.height / rect.height);
    wavelengthBin = Math.floor((wavelengthBin - 15) / 10);
    intensity = Math.min(1, Math.max(0, (canvas.height - 49 - intensity) / (canvas.height - 64)));
    spdArray[wavelengthBin] = intensity;
}

function drawCMF(canvas, wavelength, cmfArray = arrayCOLMATRGB, colors = LMSCOLORS, color = "#000", width = 2) {
    for (let i = 0; i < cmfArray.length; i++)
        drawSPD(canvas, cmfArray[i], colors[i]);
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.beginPath();
    canvas.moveTo(wavelength * 10 + 15, 3);
    canvas.lineTo(wavelength * 10 + 15, 255);
    canvas.stroke();
}

function drawSpectralBar(canvas, means = LMSMEANS, deviations = LMSDEVNS, correction = 1, height = 50) {
    let spd = new Array(126).fill(0)
    canvas.lineWidth = 10;
    for (let i = 0; i < 126; i++) {
        spd[i] = 0;
        spd[i + 1] = correction;
        responses = getResponses(spd, means, deviations);
        let color = vectorMultiply(MATRIX_LMS_SRGB, responses);
        canvas.strokeStyle = getColor(color);
        canvas.beginPath();
        canvas.moveTo(i * 10 + 15, 0);
        canvas.lineTo(i * 10 + 15, 50);
        canvas.stroke();
    }
}

function drawRSP(canvas, values = ARRAYRSPSAT, colors = LMSCOLORS, means = LMSMEANS, deviations = LMSDEVNS, magnitudes = LMSMAGNS, norms = LMSNORMS, cones = CONES, correction = 1, y = 200, width = 2) {
    canvas.lineWidth = width;
    initializeCanvasText(canvas, "#000", "right");
    let responseSum = new Array(colors.length).fill(0);
    let valueSum = new Array(colors.length).fill(0);
    let y_n = 0;
    for (let c = 0; c < colors.length; c++) {
        canvas.strokeStyle = colors[c];
        canvas.beginPath();
        canvas.moveTo(15, c * 60 + 65);
        for (let i = 0; i < 126; i++) {
            y_n = Math.min(values[i] * magnitudes[c] * (2.7 ** -(((i - means[c])/deviations[c]) ** 2)), 1);
            canvas.lineTo(i * 10 + 15, c * 60 + 65 - (y * 0.25 * y_n));
            responseSum[c] += y_n;
            if (values[i] != 0) valueSum[c] += 1;
        }
        canvas.stroke();
        canvas.lineTo(1265, c * 60 + 65);
        canvas.fillStyle = colors[c];
        canvas.fill();
        if (valueSum[c] == 0) { responseSum[c] = 0; } // prevent div by zero
        else { responseSum[c] = correction * responseSum[c] * Math.max((valueSum[c] ** -1.1), norms[c]); }
        canvas.fillText(cones[c] + ":" + responseSum[c].toFixed(3), 1265, c * 60 + 49);
    }
    return responseSum;
}

function drawSSC(canvas, colors = LMSCOLORS, means = LMSMEANS, deviations = LMSDEVNS, magnitudes = LMSMAGNS, y = 300, width = 2) {
    canvas.lineWidth = width;
    for (let c = 0; c < colors.length; c++) {
        canvas.strokeStyle = colors[c];
        canvas.beginPath();
        canvas.moveTo(15, y - 49);
        for (let i = 0; i < 126; i++)
            canvas.lineTo(i * 10 + 15, y * (1 - 0.76 * magnitudes[c] * (2.7 ** -(((i - means[c])/deviations[c]) ** 2))) - 49);
        canvas.stroke();
    }
    drawWavelengthAxes(canvas, y, "#000", 2);
}

function drawSPD(canvas, values, color = "#000", colorAxes = "#000", y = 300, width = 2) {
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.beginPath();
    canvas.moveTo(15, y - 55);
    for (let i = 0; i < 126; i++)
        canvas.lineTo(i * 10 + 15, y * (1 - values[i] * 0.76) - 49);
    canvas.stroke();
    drawWavelengthAxes(canvas, y, colorAxes, 2);
}

function drawWavelengthAxes(canvas, y = 300, color = "#000", width = 2) {
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.beginPath();
    canvas.moveTo(15, 15);
    canvas.lineTo(15, y - 45);
    canvas.lineTo(WIDTH - 15, y - 45);
    canvas.stroke();
    initializeCanvasText(canvas);
    for (let i = 0; i < 7; i++)
        canvas.fillText(i * 50 + 400 + "nm", i * 180 + 100, y - 25);
}

function drawPhoton(canvas, wavelength, x, y, length = 200, amplitude = 75, color = "#000", width = 2) {
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.beginPath();
    canvas.moveTo(x, y);
    for (let i = 0; i < length; i++) {
        canvas.lineTo(x + i, y + amplitude * Math.sin(3.14 * i / length) * Math.sin(i * wavelength));
    }
    canvas.stroke();
}

function getResponses(values = ARRAYRSPSAT, means = LMSMEANS, deviations = LMSDEVNS, magnitudes = LMSMAGNS, norms = LMSNORMS) {
    let responseSum = new Array(means.length).fill(0);
    let valueSum = new Array(means.length).fill(0);
    let y_n = 0;
    for (let c = 0; c < means.length; c++) {
        for (let i = 0; i < 126; i++) {
            responseSum[c] += values[i] * magnitudes[c] * (2.7 ** -(((i - means[c])/deviations[c]) ** 2));
            if (values[i] != 0) valueSum[c] += 1;
        }
        if (valueSum[c] == 0) { responseSum[c] = 0; } // prevent div by zero
        else { responseSum[c] = responseSum[c] * Math.max((valueSum[c] ** -1.1), norms[c]); }
    }
    return responseSum;
}

function getColor(rgbArray) {
    let r = Math.floor(Math.max(0, Math.min(rgbArray[0], 1)) * 255);
    let g = Math.floor(Math.max(0, Math.min(rgbArray[1], 1)) * 255);
    let b = Math.floor(Math.max(0, Math.min(rgbArray[2], 1)) * 255);
    return `rgb(${r}, ${g}, ${b})`
}

function colorBoxRGB(div, rgbArray) {
    div.style.backgroundColor = getColor(rgbArray);
}

function getNameWavelength(div, wavelength) {
    if (wavelength < 460 || wavelength > 620) { div.style.color = "#fff";
    } else div.style.color = "#000";
    if (wavelength >= 380 && wavelength < 430) { return "Violet"; }
    else if (wavelength >= 430 && wavelength < 500) { return "Blue"; }
    else if (wavelength >= 500 && wavelength < 520) { return "Cyan"; }
    else if (wavelength >= 520 && wavelength < 570) { return "Green"; }
    else if (wavelength >= 570 && wavelength < 580) { return "Yellow"; }
    else if (wavelength >= 580 && wavelength < 630) { return "Orange"; }
    else if (wavelength >= 630 && wavelength < 740) { return "Red"; }
    else { return "None"; }
}

function matrixMultiply(matrixA, matrixB) {
    let result = new Array(matrixA.length).fill(0).map(() => Array(matrixB[0].length).fill(0));
    for (let i = 0; i < matrixA.length; i++)
        for (let j = 0; j < matrixB[0].length; j++)
            for (let k = 0; k < matrixB.length; k++)
                result[i][j] += matrixA[i][k] * matrixB[k][j];
    return result;
}

function vectorMultiply(matrix, vector) {
    let result = new Array(matrix.length).fill(0);
    for (let i = 0; i < matrix.length; i++)
        for (let j = 0; j < vector.length; j++)
        result[i] += matrix[i][j] * vector[j];
    return result;
}

function initializeCanvas(canvasID, height, width = WIDTH) {
    const canvas = document.getElementById(canvasID).getContext("2d");
    canvas.canvas.width = width;
    canvas.canvas.height = height;
    return canvas;
}

function initializeCanvasText(canvas, color = "#000", horizontal = "center", vertical = "middle", font = "25px JetBrains Mono") {
    canvas.font = font;
    canvas.textBaseline = vertical;
    canvas.textAlign = horizontal;
    canvas.fillStyle = color;
}

function initializeProgressBar(bar, maximum, value) {
    bar.max = maximum;
    bar.value = value;
}

function initializeSliders(slider, minimum, maximum, step, value) {
    slider.min = minimum;
    slider.max = maximum;
    slider.step = step;
    slider.value = value;
}

function identityTransform(array) {
    return array;
}

/*
function hslToRgb(h, s, l) {
    const c = (1 - Math.abs(2 * l - 1)) * s;  // Chroma
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));  // Temporary value
    const m = l - c / 2;  // Match value

    let r = 0, g = 0, b = 0;
    if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
    else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
    else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
    else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
    else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
    else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }
    // Convert to RGB values
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return { r, g, b };
*/

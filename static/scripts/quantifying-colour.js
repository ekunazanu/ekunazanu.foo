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

// http://brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
const MATRIX_XYZ_RGB = [
    [ 2.3706743, -0.9000405, -0.4706338],
    [-0.5138850,  1.4253036,  0.0885814],
    [ 0.0052982, -0.0146949,  1.0093968]];
const MATRIX_RGB_XYZ = [
    [0.4887180, 0.3106803, 0.2006017],
    [0.1762044, 0.8129847, 0.0108109],
    [0.0000000, 0.0102048, 0.9897952]];
const MATRIX_XYZ_SRGB = [
    [ 3.2404542, -1.5371385, -0.4985314],
    [-0.9692660,  1.8760108,  0.0415560],
    [ 0.0556434, -0.2040259,  1.0572252]];
const MATRIX_LMS_SRGB = [
    [ 5.4336886, -4.77398843, 0.3306119],
    [-0.7913143,  1.75772089, 0.0353320],
    [ 0.0316132, -0.07734499, 1.0312963]];
const MATRIX_TEMP_SRGB = [
    [16.302, -14.322, -0.531],
    [-1.582,   3.516, -0.055],
    [ 0.032,  -0.077,  1.031]];

const ARRAYRSPSAT = new Array(126).fill(1);

const arraySPDGrey = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
const arraySPDPink = [0.561, 0.573, 0.585, 0.596, 0.606, 0.616, 0.625, 0.633, 0.640, 0.647, 0.653, 0.658, 0.662, 0.665, 0.667, 0.668, 0.669, 0.668, 0.667, 0.664, 0.661, 0.657, 0.652, 0.646, 0.640, 0.633, 0.625, 0.616, 0.607, 0.597, 0.587, 0.576, 0.565, 0.554, 0.542, 0.530, 0.518, 0.506, 0.494, 0.482, 0.470, 0.458, 0.447, 0.436, 0.425, 0.414, 0.404, 0.395, 0.386, 0.378, 0.370, 0.363, 0.357, 0.352, 0.348, 0.344, 0.342, 0.340, 0.340, 0.340, 0.342, 0.345, 0.348, 0.353, 0.359, 0.365, 0.373, 0.382, 0.392, 0.403, 0.414, 0.427, 0.441, 0.455, 0.471, 0.487, 0.504, 0.521, 0.539, 0.558, 0.577, 0.597, 0.617, 0.637, 0.657, 0.678, 0.698, 0.719, 0.739, 0.759, 0.779, 0.799, 0.818, 0.836, 0.854, 0.871, 0.888, 0.903, 0.918, 0.931, 0.944, 0.955, 0.965, 0.975, 0.982, 0.989, 0.994, 0.998, 1.000, 1.001, 1.001, 0.999, 0.996, 0.992, 0.986, 0.978, 0.970, 0.960, 0.949, 0.937, 0.923, 0.909, 0.893, 0.877, 0.859, 0.841];
const arraySPDOlive = [0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.001, 0.001, 0.001, 0.001, 0.002, 0.002, 0.003, 0.004, 0.005, 0.006, 0.008, 0.010, 0.012, 0.015, 0.018, 0.022, 0.027, 0.033, 0.040, 0.047, 0.057, 0.067, 0.079, 0.093, 0.109, 0.127, 0.146, 0.168, 0.193, 0.219, 0.248, 0.279, 0.313, 0.348, 0.386, 0.426, 0.467, 0.509, 0.553, 0.597, 0.641, 0.684, 0.727, 0.768, 0.808, 0.845, 0.879, 0.909, 0.936, 0.959, 0.977, 0.990, 0.997, 1.000, 0.997, 0.990, 0.977, 0.959, 0.936, 0.909, 0.879, 0.845, 0.808, 0.768, 0.727, 0.684, 0.641, 0.597, 0.553, 0.509, 0.467, 0.426, 0.386, 0.348, 0.313, 0.279, 0.248, 0.219, 0.193, 0.168, 0.146, 0.127, 0.109, 0.093, 0.079, 0.067, 0.057, 0.047, 0.040, 0.033, 0.027, 0.022, 0.018, 0.015, 0.012, 0.010, 0.008, 0.006, 0.005, 0.004, 0.003, 0.002, 0.002, 0.001, 0.001, 0.001, 0.001, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000];
const arraySPDPurple = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
const arraySPDSun = [0.57, 0.589, 0.609, 0.627, 0.646, 0.664, 0.681, 0.698, 0.714, 0.73, 0.746, 0.76, 0.775, 0.789, 0.802, 0.814, 0.826, 0.838, 0.849, 0.859, 0.869, 0.879, 0.887, 0.896, 0.904, 0.911, 0.918, 0.924, 0.93, 0.935, 0.94, 0.944, 0.948, 0.952, 0.955, 0.958, 0.96, 0.962, 0.964, 0.965, 0.966, 0.967, 0.967, 0.967, 0.967, 0.966, 0.965, 0.964, 0.963, 0.961, 0.959, 0.957, 0.955, 0.952, 0.949, 0.946, 0.943, 0.94, 0.936, 0.933, 0.929, 0.925, 0.921, 0.917, 0.912, 0.908, 0.903, 0.899, 0.894, 0.889, 0.884, 0.879, 0.874, 0.869, 0.864, 0.858, 0.853, 0.848, 0.842, 0.837, 0.831, 0.826, 0.82, 0.814, 0.809, 0.803, 0.797, 0.792, 0.786, 0.78, 0.774, 0.769, 0.763, 0.757, 0.751, 0.746, 0.74, 0.734, 0.728, 0.723, 0.717, 0.711, 0.705, 0.7, 0.694, 0.688, 0.683, 0.677, 0.672, 0.666, 0.661, 0.655, 0.65, 0.644, 0.639, 0.633, 0.628, 0.623, 0.617, 0.612, 0.607, 0.602, 0.597, 0.591, 0.586, 0.581];
const arraySPDD65 = [0.413, 0.431, 0.443, 0.455, 0.487, 0.558, 0.606, 0.677, 0.716, 0.738, 0.761, 0.775, 0.78, 0.785, 0.79, 0.78, 0.769, 0.752, 0.735, 0.781, 0.827, 0.858, 0.899, 0.93, 0.961, 0.992, 0.993, 0.995, 0.997, 0.996, 0.988, 0.983, 0.976, 0.975, 0.978, 0.981, 0.982, 0.964, 0.946, 0.928, 0.923, 0.924, 0.925, 0.927, 0.923, 0.92, 0.916, 0.911, 0.903, 0.896, 0.888, 0.893, 0.9, 0.908, 0.91, 0.901, 0.896, 0.888, 0.884, 0.883, 0.882, 0.882, 0.871, 0.861, 0.851, 0.841, 0.835, 0.826, 0.816, 0.815, 0.814, 0.813, 0.806, 0.788, 0.77, 0.752, 0.754, 0.757, 0.761, 0.762, 0.761, 0.761, 0.76, 0.756, 0.751, 0.748, 0.743, 0.732, 0.721, 0.71, 0.706, 0.707, 0.708, 0.709, 0.7, 0.691, 0.684, 0.678, 0.679, 0.679, 0.68, 0.683, 0.689, 0.694, 0.694, 0.684, 0.677, 0.667, 0.649, 0.627, 0.605, 0.591, 0.596, 0.6, 0.605, 0.612, 0.616, 0.623, 0.63, 0.598, 0.565, 0.544, 0.529, 0.55, 0.571, 0.592];

const arrayCOLMATX = [0.001, 0.001, 0.001, 0.002, 0.003, 0.004, 0.006, 0.008, 0.010, 0.013, 0.019, 0.027, 0.038, 0.048, 0.067, 0.092, 0.119, 0.144, 0.158, 0.174, 0.186, 0.192, 0.195, 0.194, 0.191, 0.187, 0.181, 0.174, 0.168, 0.158, 0.145, 0.128, 0.109, 0.096, 0.079, 0.063, 0.048, 0.036, 0.029, 0.020, 0.013, 0.008, 0.004, 0.003, 0.001, 0.002, 0.004, 0.009, 0.013, 0.023, 0.035, 0.050, 0.067, 0.079, 0.098, 0.119, 0.139, 0.161, 0.176, 0.200, 0.224, 0.249, 0.276, 0.293, 0.321, 0.349, 0.377, 0.405, 0.423, 0.451, 0.477, 0.501, 0.524, 0.537, 0.555, 0.570, 0.582, 0.589, 0.590, 0.589, 0.584, 0.573, 0.557, 0.544, 0.521, 0.495, 0.464, 0.429, 0.405, 0.369, 0.334, 0.301, 0.269, 0.249, 0.219, 0.191, 0.166, 0.142, 0.128, 0.109, 0.092, 0.076, 0.063, 0.055, 0.046, 0.038, 0.031, 0.026, 0.023, 0.018, 0.015, 0.012, 0.009, 0.008, 0.007, 0.006, 0.005, 0.004, 0.003, 0.003, 0.002, 0.002, 0.001, 0.001, 0.001, 0.001];
const arrayCOLMATY = [0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.001, 0.001, 0.001, 0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.008, 0.010, 0.012, 0.014, 0.016, 0.018, 0.021, 0.024, 0.028, 0.031, 0.035, 0.039, 0.045, 0.051, 0.055, 0.063, 0.071, 0.080, 0.090, 0.098, 0.111, 0.126, 0.144, 0.164, 0.179, 0.206, 0.236, 0.268, 0.303, 0.326, 0.361, 0.394, 0.423, 0.449, 0.465, 0.485, 0.503, 0.518, 0.530, 0.537, 0.545, 0.550, 0.554, 0.555, 0.555, 0.554, 0.550, 0.544, 0.535, 0.529, 0.517, 0.504, 0.489, 0.472, 0.460, 0.441, 0.421, 0.400, 0.379, 0.365, 0.343, 0.322, 0.301, 0.279, 0.266, 0.245, 0.225, 0.205, 0.185, 0.172, 0.153, 0.136, 0.121, 0.106, 0.097, 0.085, 0.073, 0.063, 0.053, 0.048, 0.040, 0.034, 0.028, 0.023, 0.020, 0.017, 0.014, 0.011, 0.009, 0.008, 0.007, 0.005, 0.004, 0.003, 0.003, 0.002, 0.002, 0.002, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.000, 0.000, 0.000];
const arrayCOLMATZ = [0.004, 0.005, 0.007, 0.009, 0.013, 0.018, 0.026, 0.038, 0.045, 0.061, 0.090, 0.130, 0.184, 0.231, 0.322, 0.443, 0.577, 0.699, 0.770, 0.857, 0.920, 0.961, 0.983, 0.989, 0.990, 0.985, 0.977, 0.963, 0.948, 0.915, 0.869, 0.800, 0.715, 0.660, 0.579, 0.501, 0.428, 0.362, 0.324, 0.273, 0.231, 0.196, 0.167, 0.151, 0.130, 0.112, 0.094, 0.077, 0.067, 0.054, 0.043, 0.036, 0.030, 0.027, 0.022, 0.018, 0.014, 0.011, 0.010, 0.007, 0.006, 0.004, 0.003, 0.003, 0.002, 0.002, 0.002, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000];
const arrayCOLMATR = [0.000, 0.000, 0.000, 0.000, 0.000, 0.001, 0.001, 0.001, 0.002, 0.002, 0.001, 0.001, 0.002, 0.004, 0.005, 0.006, 0.006, 0.007, 0.006, 0.001, -0.001, -0.007, -0.012, -0.019, -0.029, -0.039, -0.052, -0.065, -0.075, -0.087, -0.100, -0.113, -0.124, -0.132, -0.141, -0.150, -0.159, -0.166, -0.171, -0.180, -0.191, -0.202, -0.216, -0.225, -0.244, -0.260, -0.275, -0.287, -0.294, -0.295, -0.291, -0.279, -0.259, -0.243, -0.214, -0.179, -0.143, -0.100, -0.070, -0.019, 0.033, 0.089, 0.153, 0.193, 0.261, 0.331, 0.403, 0.478, 0.526, 0.603, 0.676, 0.747, 0.816, 0.858, 0.918, 0.971, 1.019, 1.054, 1.070, 1.087, 1.094, 1.087, 1.069, 1.050, 1.014, 0.970, 0.915, 0.850, 0.805, 0.737, 0.669, 0.604, 0.542, 0.502, 0.442, 0.387, 0.336, 0.288, 0.260, 0.222, 0.187, 0.154, 0.128, 0.112, 0.093, 0.077, 0.063, 0.053, 0.047, 0.036, 0.031, 0.024, 0.018, 0.016, 0.014, 0.012, 0.010, 0.008, 0.006, 0.006, 0.003, 0.003, 0.001, 0.002, 0.002, 0.002, 0.001];
const arrayCOLMATG = [0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.001, 0.003, 0.006, 0.010, 0.015, 0.021, 0.027, 0.035, 0.041, 0.049, 0.058, 0.069, 0.080, 0.087, 0.100, 0.113, 0.127, 0.141, 0.153, 0.172, 0.193, 0.218, 0.246, 0.266, 0.304, 0.345, 0.388, 0.434, 0.463, 0.507, 0.547, 0.580, 0.608, 0.624, 0.642, 0.657, 0.668, 0.673, 0.675, 0.674, 0.669, 0.662, 0.649, 0.640, 0.624, 0.604, 0.581, 0.554, 0.536, 0.505, 0.473, 0.439, 0.403, 0.379, 0.343, 0.307, 0.271, 0.237, 0.217, 0.186, 0.158, 0.134, 0.111, 0.099, 0.081, 0.066, 0.053, 0.043, 0.037, 0.028, 0.022, 0.017, 0.012, 0.010, 0.008, 0.005, 0.004, 0.002, 0.002, 0.001, 0.001, 0.001, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000];
const arrayCOLMATB = [0.004, 0.005, 0.007, 0.009, 0.013, 0.018, 0.026, 0.038, 0.045, 0.061, 0.090, 0.131, 0.185, 0.233, 0.325, 0.447, 0.582, 0.706, 0.777, 0.865, 0.929, 0.970, 0.993, 0.999, 1.000, 0.994, 0.986, 0.972, 0.957, 0.923, 0.877, 0.807, 0.721, 0.665, 0.583, 0.504, 0.431, 0.364, 0.325, 0.274, 0.231, 0.195, 0.166, 0.149, 0.128, 0.109, 0.090, 0.073, 0.062, 0.049, 0.037, 0.030, 0.024, 0.020, 0.015, 0.011, 0.007, 0.004, 0.003, 0.000, 0.000, -0.002, -0.003, -0.003, -0.004, -0.004, -0.003, -0.004, -0.004, -0.004, -0.003, -0.003, -0.003, -0.002, -0.002, -0.002, -0.001, -0.001, -0.002, -0.001, -0.001, -0.001, -0.001 -0.001, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000];
const arrayCHRMATR = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -0.001, -0.007, -0.012, -0.019, -0.029, -0.039, -0.054, -0.069, -0.081, -0.098, -0.119, -0.148, -0.183, -0.212, -0.260, -0.321, -0.398, -0.489, -0.557, -0.676, -0.819, -0.957, -1.102, -1.184, -1.297, -1.340, -1.354, -1.304, -1.272, -1.130, -0.993, -0.842, -0.694, -0.605, -0.483, -0.366, -0.268, -0.173, -0.115, -0.029, 0.047, 0.118, 0.191, 0.232, 0.296, 0.355, 0.410, 0.464, 0.497, 0.546, 0.589, 0.631, 0.671, 0.694, 0.729, 0.760, 0.790, 0.817, 0.832, 0.854, 0.874, 0.890, 0.907, 0.913, 0.926, 0.936, 0.945, 0.951, 0.956, 0.963, 0.968, 0.972, 0.978, 0.980, 0.982, 0.987, 0.988, 0.993, 0.992, 0.995, 0.994, 0.993, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const arrayCHRMATG = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.001, 0.003, 0.006, 0.010, 0.015, 0.021, 0.028, 0.037, 0.044, 0.055, 0.069, 0.090, 0.118, 0.140, 0.184, 0.241, 0.318, 0.415, 0.498, 0.646, 0.828, 1.033, 1.255, 1.400, 1.617, 1.778, 1.911, 1.972, 2.004, 1.942, 1.866, 1.752, 1.630, 1.556, 1.449, 1.343, 1.255, 1.166, 1.110, 1.029, 0.952, 0.883, 0.812, 0.771, 0.708, 0.648, 0.592, 0.538, 0.506, 0.457, 0.412, 0.371, 0.331, 0.306, 0.272, 0.240, 0.210, 0.183, 0.168, 0.146, 0.126, 0.109, 0.094, 0.086, 0.073, 0.063, 0.054, 0.048, 0.043, 0.036, 0.031, 0.027, 0.021, 0.019, 0.017, 0.012, 0.011, 0.006, 0.007, 0.004, 0.005, 0.006, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const arrayCHRMATB = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.004, 1.006, 1.009, 1.014, 1.018, 1.026, 1.031, 1.036, 1.042, 1.050, 1.057, 1.064, 1.072, 1.075, 1.079, 1.080, 1.073, 1.058, 1.030, 0.991, 0.924, 0.846, 0.784, 0.680, 0.561, 0.443, 0.331, 0.268, 0.187, 0.126, 0.090, 0.064, 0.049, 0.033, 0.022, 0.013, 0.006, 0.004, 0, 0, -0.002, -0.003, -0.003, -0.004, -0.004, -0.003, -0.003, -0.003, -0.003, -0.002, -0.002, -0.002, -0.001, -0.001, -0.001, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const arrayCHRMATX = [0.171, 0.171, 0.171, 0.171, 0.171, 0.171, 0.171, 0.171, 0.171, 0.171, 0.171, 0.171, 0.171, 0.171, 0.171, 0.171, 0.17, 0.170, 0.169, 0.167, 0.166, 0.166, 0.163, 0.162, 0.159, 0.157, 0.153, 0.149, 0.146, 0.143, 0.138, 0.131, 0.124, 0.118, 0.109, 0.099, 0.086, 0.074, 0.064, 0.049, 0.035, 0.023, 0.012, 0.009, 0.003, 0.006, 0.011, 0.023, 0.032, 0.052, 0.074, 0.098, 0.123, 0.138, 0.162, 0.186, 0.207, 0.229, 0.243, 0.266, 0.287, 0.308, 0.331, 0.344, 0.367, 0.387, 0.408, 0.430, 0.444, 0.465, 0.486, 0.506, 0.526, 0.538, 0.557, 0.574, 0.592, 0.608, 0.618, 0.632, 0.644, 0.656, 0.666, 0.672, 0.680, 0.687, 0.693, 0.699, 0.702, 0.707, 0.711, 0.713, 0.717, 0.720, 0.720, 0.723, 0.725, 0.728, 0.727, 0.731, 0.730, 0.730, 0.732, 0.733, 0.733, 0.733, 0.733, 0.733, 0.733, 0.733, 0.733, 0.733, 0.733, 0.733, 0.733, 0.733, 0.733, 0.733, 0.733, 0.733, 0.733, 0.733, 0.733, 0.733, 0.733, 0.733];
const arrayCHRMATY = [0.005, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005, 0.006, 0.007, 0.008, 0.010, 0.011, 0.013, 0.015, 0.017, 0.020, 0.024, 0.027, 0.031, 0.037, 0.046, 0.058, 0.067, 0.087, 0.111, 0.143, 0.184, 0.217, 0.274, 0.340, 0.413, 0.489, 0.537, 0.611, 0.674, 0.732, 0.778, 0.802, 0.824, 0.834, 0.831, 0.822, 0.814, 0.801, 0.785, 0.771, 0.754, 0.742, 0.724, 0.705, 0.686, 0.665, 0.652, 0.631, 0.610, 0.589, 0.568, 0.555, 0.533, 0.513, 0.493, 0.473, 0.460, 0.442, 0.424, 0.406, 0.391, 0.382, 0.368, 0.355, 0.344, 0.333, 0.328, 0.319, 0.312, 0.306, 0.301, 0.298, 0.293, 0.289, 0.286, 0.282, 0.280, 0.279, 0.276, 0.275, 0.271, 0.272, 0.268, 0.269, 0.269, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267, 0.267];
const arrayCHRMATZ = [0.823, 0.823, 0.823, 0.823, 0.823, 0.823, 0.823, 0.823, 0.823, 0.823, 0.823, 0.823, 0.823, 0.823, 0.823, 0.823, 0.824, 0.824, 0.824, 0.824, 0.824, 0.824, 0.824, 0.824, 0.825, 0.825, 0.826, 0.826, 0.826, 0.825, 0.825, 0.822, 0.817, 0.813, 0.803, 0.788, 0.769, 0.741, 0.718, 0.675, 0.624, 0.563, 0.498, 0.453, 0.385, 0.32, 0.256, 0.197, 0.165, 0.123, 0.091, 0.070, 0.054, 0.047, 0.036, 0.028, 0.020, 0.015, 0.013, 0.009, 0.007, 0.004, 0.003, 0.003, 0.002, 0.002, 0.002, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const arrayCOLMATSR = [0.17, 0.29, 0.38, 0.43, 0.46, 0.49, 0.50, 0.51, 0.50, 0.48, 0.46, 0.43, 0.4, 0.38, 0.35, 0.33, 0.3, 0.26, 0.23, 0.2, 0.17, 0.13, 0.1, 0.06, 0.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.01, 0.11, 0.1, 0.15, 0.25, 0.3, 0.35, 0.45, 0.5, 0.54, 0.64, 0.69, 0.73, 0.83, 0.87, 0.92, 0.96, 1.05, 1.04, 1.14, 1.18, 1.22, 1.26, 1.3, 1.29, 1.33, 1.31, 1.35, 1.33, 1.37, 1.35, 1.34, 1.37, 1.36, 1.34, 1.33, 1.26, 1.29, 1.23, 1.21, 1.19, 1.18, 1.11, 1.1, 1.09, 1.02, 1.01, 0.94, 0.88, 0.86, 0.85, 0.79, 0.78, 0.72, 0.66, 0.64, 0.64, 0.57, 0.51, 0.51, 0.5, 0.44, 0.39, 0.38, 0.37, 0.32, 0.31, 0.3, 0.25, 0.24];
const arrayCOLMATSG = [0.06, 0.06, 0.07, 0.07, 0.09, 0.11, 0.1, 0.12, 0.14, 0.13, 0.15, 0.16, 0.18, 0.19, 0.21, 0.22, 0.26, 0.27, 0.28, 0.31, 0.32, 0.35, 0.37, 0.39, 0.41, 0.44, 0.46, 0.49, 0.52, 0.54, 0.56, 0.61, 0.63, 0.65, 0.69, 0.71, 0.73, 0.76, 0.78, 0.82, 0.83, 0.87, 0.88, 0.89, 0.93, 0.94, 0.96, 0.97, 0.99, 1, 1.01, 1.02, 1.04, 1.03, 1.05, 1.05, 1.05, 1.05, 1.05, 1.05, 1.04, 1.04, 1.03, 1.01, 1, 1, 0.97, 0.96, 0.94, 0.92, 0.9, 0.88, 0.86, 0.83, 0.82, 0.78, 0.75, 0.73, 0.7, 0.67, 0.65, 0.63, 0.61, 0.57, 0.55, 0.52, 0.49, 0.47, 0.44, 0.42, 0.39, 0.37, 0.36, 0.32, 0.31, 0.29, 0.26, 0.24, 0.23, 0.21, 0.19, 0.18, 0.16, 0.15, 0.15, 0.13, 0.11, 0.11, 0.09, 0.09, 0.09, 0.07, 0.06, 0.05, 0.05, 0.04, 0.03, 0.03, 0.04, 0.03, 0.02, 0.03, 0.02, 0.01, 0.02, 0.01];
const arrayCOLMATSB = [0.17, 0.33, 0.43, 0.46, 0.48, 0.51, 0.53, 0.54, 0.54, 0.53, 0.51, 0.53, 0.54, 0.54, 0.54, 0.55, 0.55, 0.56, 0.58, 0.6, 0.62, 0.64, 0.67, 0.69, 0.7, 0.72, 0.75, 0.78, 0.82, 0.85, 0.89, 0.91, 0.94, 0.96, 0.98, 0.99, 1, 1, 1, 0.99, 0.97, 0.95, 0.93, 0.9, 0.88, 0.83, 0.8, 0.76, 0.72, 0.68, 0.63, 0.58, 0.54, 0.5, 0.46, 0.42, 0.37, 0.33, 0.29, 0.26, 0.23, 0.2, 0.17, 0.15, 0.12, 0.1, 0.08, 0.07, 0.05, 0.04, 0.03, 0.02, 0.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const arrayPLANCKX = [0.657, 0.624, 0.596, 0.57, 0.545, 0.521, 0.5, 0.48, 0.462, 0.445, 0.43, 0.416, 0.404, 0.393, 0.383, 0.374, 0.366, 0.358, 0.352, 0.345, 0.34, 0.335, 0.33, 0.325, 0.321, 0.318, 0.314, 0.311, 0.308, 0.305, 0.303, 0.3, 0.298, 0.296, 0.294, 0.292, 0.29, 0.289, 0.287, 0.286, 0.284, 0.283, 0.282, 0.28, 0.279, 0.278, 0.277, 0.276, 0.275, 0.274, 0.274, 0.273, 0.272, 0.271, 0.271, 0.27, 0.269, 0.269, 0.268, 0.267, 0.267, 0.266, 0.266, 0.265, 0.265, 0.264, 0.264, 0.264, 0.263, 0.263, 0.262, 0.262, 0.262, 0.261, 0.261, 0.261, 0.26, 0.26, 0.26, 0.259, 0.259, 0.259, 0.258, 0.258, 0.258, 0.258, 0.257, 0.257, 0.257, 0.257];
const arrayPLANCKY = [0.344, 0.368, 0.387, 0.401, 0.41, 0.414, 0.415, 0.414, 0.411, 0.407, 0.402, 0.396, 0.39, 0.384, 0.378, 0.373, 0.367, 0.362, 0.357, 0.352, 0.347, 0.343, 0.339, 0.335, 0.331, 0.328, 0.324, 0.321, 0.318, 0.315, 0.313, 0.31, 0.308, 0.305, 0.303, 0.301, 0.299, 0.298, 0.296, 0.294, 0.292, 0.291, 0.289, 0.288, 0.287, 0.285, 0.284, 0.283, 0.282, 0.281, 0.28, 0.279, 0.278, 0.277, 0.276, 0.275, 0.274, 0.274, 0.273, 0.272, 0.271, 0.271, 0.27, 0.269, 0.269, 0.268, 0.268, 0.267, 0.267, 0.266, 0.266, 0.265, 0.265, 0.264, 0.264, 0.263, 0.263, 0.262, 0.262, 0.262, 0.261, 0.261, 0.26, 0.26, 0.26, 0.259, 0.259, 0.259, 0.258, 0.258];
const arrayPLANCKZ = [0.003, 0.008, 0.017, 0.03, 0.046, 0.065, 0.085, 0.106, 0.128, 0.148, 0.168, 0.188, 0.206, 0.223, 0.238, 0.253, 0.267, 0.28, 0.292, 0.303, 0.313, 0.323, 0.332, 0.34, 0.348, 0.355, 0.362, 0.368, 0.374, 0.379, 0.385, 0.39, 0.394, 0.399, 0.403, 0.407, 0.41, 0.414, 0.417, 0.42, 0.423, 0.426, 0.429, 0.431, 0.434, 0.436, 0.438, 0.441, 0.443, 0.445, 0.446, 0.448, 0.45, 0.452, 0.453, 0.455, 0.456, 0.458, 0.459, 0.46, 0.462, 0.463, 0.464, 0.465, 0.466, 0.467, 0.468, 0.469, 0.47, 0.471, 0.472, 0.473, 0.474, 0.475, 0.475, 0.476, 0.477, 0.478, 0.478, 0.479, 0.48, 0.48, 0.481, 0.482, 0.482, 0.483, 0.484, 0.484, 0.485, 0.485];

const XYA = [0.448, 0.407, 0.145];
const XYB1 = [0.456, 0.408, 0.136];
const XYB5 = [0.312, 0.324, 0.364];
const XYD50 = [0.346, 0.359, 0.295];
const XYD55 = [0.332, 0.347, 0.321];
const XYD65 = [0.313, 0.329, 0.358];
const XYD75 = [0.299, 0.315, 0.386];
const XYE = [0.333, 0.333, 0.333];
const XYF1 = [0.313, 0.337, 0.350];
const XYF4 = [0.440, 0.403, 0.157];
const XYDCI = [[0.680, 0.320, 0], [0.265, 0.690, 0.045], [0.150, 0.060, 0.79]];
const XYSRGB = [[0.640, 0.330, 0.003], [0.300, 0.600, 0.100], [0.150, 0.060, 0.790]];
const XYPROPH = [[0.7347, 0.2653, 0], [0.1596, 0.8404, 0], [0.0366, 0.0001, 0.9633]];
const XYCIERGB = [[0.733, 0.267, 0], [0.266, 0.724, 0.009], [0.166, 0.008, 0.824]];
const XYADBRGB = [[0.640, 0.330, 0.03], [0.210, 0.710, 0.080], [0.150, 0.060, 0.790]];
const XYRECBT = [[0.708, 0.292, 0], [0.170, 0.797, 0.033], [0.131, 0.046, 0.823]];

const arrayCOLMATRGB = [arrayCOLMATR, arrayCOLMATG, arrayCOLMATB];
const arrayCOLMATXYZ = [arrayCOLMATX, arrayCOLMATY, arrayCOLMATZ];
const arrayCHRMATRGB = [arrayCHRMATR, arrayCHRMATG, arrayCHRMATB];
const arrayCHRMATXYZ = [arrayCHRMATX, arrayCHRMATY, arrayCHRMATZ];
const arrayPLANCKXYZ = [arrayPLANCKX, arrayPLANCKY, arrayPLANCKZ];
const arrayCOLMATSRGB = [arrayCOLMATSR, arrayCOLMATSG, arrayCOLMATSB];
const arrayXYILLS =  [XYA, XYD50, XYD55, XYD65, XYD75, XYE, XYF1, XYF4, XYB1, XYB5];
const COLSPACES = [XYSRGB, XYDCI, XYCIERGB, XYADBRGB, XYRECBT];

const RGBWAVES = [114, 59, 20]; // real wavelength = i * 2.8 + 380
const CMFLABELS = ["700nm", "546nm", "435nm"];
const CMFLABELPOS = [[960, 91], [500, 91], [130, 91]];
const CONELABELS = ["L cones", "M cones", "S cones"];
const CONELABELPOS = [[1156, 165], [900, 165], [104, 165]];
const WAVXYZLABELS = ["450nm", "500nm", "550nm", "600nm", "650nm"];
const WAVXYZLABELPOS = [[175, 585], [80, 215], [400, 105], [620, 325], [685, 395]];
const CCTTEMPS = ["1500K", "2000K", "2500K", "3000K", "4000K", "6000K", "10000K", "Inf"];
const CCTTEMPSPOS = [[572, 305], [548, 285], [492, 267], [426, 275], [362, 291], [316, 315], [266, 343], [283, 431]];
const XYILLNAMES =  ["A (Incandescent)", "D50 (Horizon Daylight)", "D55 (Morning Daylight)", "D65 (Noon Daylight)", "D75 (North Sky Daylight)", "E (Equal Energy Illuminant)", "F1 (Daylight Fluorescent)", "F4 (Warm White Fluorescent)", "LED-B1 (Warm White LED)", "LED-B5 (Daylight LED)"];
const COLSPACENAMES = ["sRGB", "DCP-P3", "CIE-RGB", "Adobe RGB", "BT.2100"];

const CCTLINES = [[[0.570, 0.384, 0], [0.595, 0.402, 0]], [[0.502, 0.385, 0], [0.545, 0.443, 0]], [[0.449, 0.373, 0], [0.500, 0.457, 0]], [[0.415, 0.359, 0], [0.452, 0.443, 0]], [[0.365, 0.325, 0], [0.392, 0.433, 0]], [[0.343, 0.335, 0], [0.345, 0.369, 0]], [[0.325, 0.280, 0], [0.321, 0.392, 0]], [[0.309, 0.303, 0], [0.302, 0.333, 0]], [[0.301, 0.288, 0], [0.288, 0.320, 0]], [[0.294, 0.282, 0], [0.279, 0.309, 0]], [[0.308, 0.242, 0], [0.250, 0.345, 0]], [[0.265, 0.248, 0], [0.245, 0.269, 0]]];

const BASEXOFF = 181;
const BASEYOFF = 481;
const BASEAXES = [[3, 0, 0, 1], [0, 3, 0, 1], [0, 0, 3, 1]];
const TRANSFMAT = [[400, 0, -120, BASEXOFF], [0, -400, 80, BASEYOFF]];
const PROJMAT = [[690, 0, 0, 131], [0, -690, 0, 591]];
const CUBEPOINTS = [1, 1, 1];
const CUBELABELPOS = [1.1, 1.2, 1.25];
const CUBELABELOFF = [0.95, 1.1, 0.95];
const IDENTITY = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

const CHRDIAGRAMDAT = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAIAAAAfs1O6AAAAAXNSR0IArs4c6QAAA7tJREFUeF591cuKHFUYwPH/d+rUpaenZ5JMLkaMuBAJQly5EeJCtz6M+AC+khvxIbIw4AVMAsEQJ5kkM+mpnumu7rqdz65zOHQxgvCnqCqoX38f1XQL+gsALTRQwwYquIRzOIHH3/HkM/gQbsF1uKbMlKljryfvyDpsS9JgtrVIi0UNgCQwzsYywMS7KVhIdci6oaTDxCSIkACgEbpSGkV/raShwPVe9FCIJn48muB1346LM4aLUBwwcF40DdKAP5r4cETHXBSTEZ/5AdMe25F4a8SNZ8T+t6uikoXCgHE0qaEOxyjuUB0vl43FFPJtSu5I4/s1NSZyxBODBiimV7ic8MqjmPVerDEbZAOjYzgJECgIoODAoxEhDlgohSNvd5ysI9dAqMWgCTpeOUOj5Z0jHuYcTpRtRUdaY9eYakgqqAaXyrceMuNliSv7im0Zk5t8co2vpnw67Ska0jVmNcQSWQ2xrdqhCT9+DwZklwiAOGge4h6Qf0xx1x3caPYmyxO7wFx6bumttW/jq2EziD9E0SAmnCOAIt3XmPtbUfM7XX6wKrJylsyPWSAXEMTqKmpxFkAUHDpGFeoPSI6or7v9WV1kl2JKlUXC+Z8sy0Gpfa2vC4UXAqh6IkEckgwZ8wC9w+wmzfV2NblMkrKVsqHsKYXF31THnov1Xuyx9BaIa/pIMT2afm7y2/RHrp1VF+l5I/OVzNect5z3LISLnNVz2gDtilsDeBS8C+I+Qm+i19omnztzNpWzKfN93teUHaWjhDJl/gTHOEtnxyAICio4ua1y4HRSrZN3Be9yTgvOJsy3bsu840x5Ba9n0EdPwVm6BAiKvyP0hla+rc2Bo2jVLFveWN5kbN3TCWcbThtetTwXmELnC2jvxdaAh0KdUAuV3Ktkr8XWjguj7ywnGW+35RwX/NGA8VzrC2IXxSbxInQ7jnO5sSKvMRWUom8TfW35J5VHGW4K5r9fnCj2diCAXmiFmoFbyL0TZhuyFeYSPYVjw++WNwXsg0ACqa8NXRENQMtAr+FCOOX+a/ZW2BI5hWeiT42SCYXSCRpQXwM20MTFDWuGKmEJC+E9vOTWS4pn2F/V/AxPcSRKqmThNxeK/8myFoANrIQS3sJfHL6geEwBFgUUo7tNs/hFAST+URroIPFbV16s4IIw4Bc/cQsOIQcTn1QS9QsKveIEBUaoQBK3rhi6JAzIb3wJRzCFDDUAKEIYE+tLNc7rS8MxZFkCccAXfPOIuzCDHLVxRkXUbxdQoSdOSlwiZv4FiZsWgB+yll0AAAAASUVORK5CYII="
const CHRDIAGRAM = new Image(); CHRDIAGRAM.src = CHRDIAGRAMDAT;


const canvasPhoton = initializeCanvas("canvasPhoton", 400);
const sliderPhotonWavelength = document.getElementById("sliderPhotonWavelength");
initializeSliders(sliderPhotonWavelength, 0.1, 0.4, 0.01, 0.3);
sliderPhotonWavelength.addEventListener("input", updatePhoton);
function updatePhoton() {
    canvasPhoton.clearRect(0, 0, WIDTH, 400);
    drawPhoton(canvasPhoton, 0.45 - sliderPhotonWavelength.value, 440, 201, 400, 150);
    drawSpaceLine(canvasPhoton, [0, 201, 0], [440, 201, 0], IDENTITY, "#000", 2);
    drawSpaceLine(canvasPhoton, [WIDTH, 201, 0], [839, 201, 0], IDENTITY, "#000", 2);
    canvasPhoton.stroke();
}
updatePhoton();


const canvasPhotonSpectrum = initializeCanvas("canvasPhotonSpectrum", 300);
initializeCanvasText(canvasPhotonSpectrum);
const arrayPhotonSpectrumWavelengths = ["1km", "1cm", "10µm", "500nm", "10nm", "0.1nm"];
const arrayPhotonSpectrumNames = ["Radio", "Microwave", "Infrared", "Visible", "Ultraviolet", "X-ray"];
for (let i = 0; i < 6; i++) {
    drawPhoton(canvasPhotonSpectrum, i * 0.05 + 0.1, i * 210 + 21, 110, 175);
    canvasPhotonSpectrum.fillText(arrayPhotonSpectrumWavelengths[i], i * 210 + 115, 225);
    canvasPhotonSpectrum.fillText(arrayPhotonSpectrumNames[i], i * 210 + 115, 265);
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
drawSPD(canvasSPDSun, arraySPDSun);


const canvasSensitivityCurves = initializeCanvas("canvasSensitivityCurves", 300);
drawSSC(canvasSensitivityCurves, [COLORR].concat(LMSCOLORS), [RODMEANS].concat(LMSMEANS), [RODDEVNS].concat(LMSDEVNS), [1, 1, 1, 1]);
drawLabels(canvasSensitivityCurves, CONELABELS, CONELABELPOS);
drawLabels(canvasSensitivityCurves, ["Rods"], [[688, 165]]);


const canvasSimpleSPD = initializeCanvas("canvasSimpleSPD", 300);
const canvasSimpleSSC = initializeCanvas("canvasSimpleSSC", 300);
const canvasSimpleRSP = initializeCanvas("canvasSimpleRSP", 200);
const sliderSimpleWavelength = document.getElementById("sliderSimpleWavelength");
initializeSliders(sliderSimpleWavelength, 0, 125, 1, 18);
var arraySimpleSPD = new Array(126).fill(0);
var varSimplePrevWavelength = 0;
sliderSimpleWavelength.addEventListener("input", updateSimple);
drawSSC(canvasSimpleSSC);
drawLabels(canvasSimpleSSC, CONELABELS, CONELABELPOS);
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
const linkNonSpectralSPDWhite = document.getElementById("linkNonSpectralSPDWhite");
const linkNonSpectralSPDOlive = document.getElementById("linkNonSpectralSPDOlive");
const linkNonSpectralSPDPink = document.getElementById("linkNonSpectralSPDPink");
const linkNonSpectralSPDPurple = document.getElementById("linkNonSpectralSPDPurple");
var arrayNonSpectralSPD = new Array(126).fill(0);
var arrayNonSpectralRSP = [0, 0, 0];
var varNonSpectralMousedown = false;
drawSSC(canvasNonSpectralSSC);
linkNonSpectralSPDGrey.addEventListener("click", () => { arrayNonSpectralSPD = [...arraySPDGrey]; updateNonSpectral(); });
linkNonSpectralSPDWhite.addEventListener("click", () => { arrayNonSpectralSPD = [...ARRAYRSPSAT]; updateNonSpectral(); });
linkNonSpectralSPDOlive.addEventListener("click", () => { arrayNonSpectralSPD = [...arraySPDOlive]; updateNonSpectral(); });
linkNonSpectralSPDPink.addEventListener("click", () => { arrayNonSpectralSPD = [...arraySPDPink]; updateNonSpectral(); });
linkNonSpectralSPDPurple.addEventListener("click", () => { arrayNonSpectralSPD = [...arraySPDPurple]; updateNonSpectral(); });
canvasNonSpectralSPD.canvas.addEventListener("mousedown", () => varNonSpectralMousedown = true); // unfortunately
canvasNonSpectralSPD.canvas.addEventListener("mouseup", () => varNonSpectralMousedown = false);  // idk a better way
canvasNonSpectralSPD.canvas.addEventListener("mouseout", () => varNonSpectralMousedown = false);
canvasNonSpectralSPD.canvas.addEventListener("touchstart", () => varNonSpectralMousedown = true);
canvasNonSpectralSPD.canvas.addEventListener("touchend", () => varNonSpectralMousedown = false);
canvasNonSpectralSPD.canvas.addEventListener("touchcancel", () => varNonSpectralMousedown = false);
canvasNonSpectralSPD.canvas.addEventListener("mousemove", (evt) => {
    if (varNonSpectralMousedown) {
        getSPD(canvasNonSpectralSPD.canvas, arrayNonSpectralSPD, evt);
        updateNonSpectral(); } });
canvasNonSpectralSPD.canvas.addEventListener("touchmove", (evt) => {
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


const canvasColorMatchCircle = initializeCanvas("canvasColorMatchCircle", 300);
const sliderColorMatchCircleIntensity = document.getElementById("sliderColorMatchCircleIntensity");
const spanColorMatchingCircleR = document.getElementById("spanColorMatchingCircleR");
let varColorMatchingCircleR = sliderColorMatchCircleIntensity.value;
canvasColorMatchCircle.globalCompositeOperation = "lighter";
initializeSliders(sliderColorMatchCircleIntensity, -1, 1, 0.05, -0.85);
sliderColorMatchCircleIntensity.addEventListener("input", updateColorMatchCircle);
function updateColorMatchCircle() {
    varColorMatchingCircleR = sliderColorMatchCircleIntensity.value;
    canvasColorMatchCircle.clearRect(0, 0, WIDTH, 300);
    canvasColorMatchCircle.fillStyle = "#000";
    canvasColorMatchCircle.fillRect(0, 0, WIDTH, 300);
    drawCircles(canvasColorMatchCircle, 270, 150, "rgb(80, 50, 200)");
    drawCircles(canvasColorMatchCircle, 370, 150, "rgb(100, 180, 0)");
    drawCircles(canvasColorMatchCircle, 1010, 150, "rgb(0, 230, 200)");
    if (varColorMatchingCircleR < 0)
        drawCircles(canvasColorMatchCircle, 910, 150, `rgb(${varColorMatchingCircleR * -215}, 0, 0)`);
    else
        drawCircles(canvasColorMatchCircle, 320, 150, `rgb(${varColorMatchingCircleR * 215}, 0, 0)`);
    spanColorMatchingCircleR.innerHTML = (varColorMatchingCircleR * 1).toFixed(2);
}
updateColorMatchCircle();


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
    drawSpaceCube(canvasColorSpaceRGBChroma);
    drawSpacePoint(canvasColorSpaceRGBChroma, arrayColorSpaceRGBChromaRSP);
    drawSpaceLabels(canvasColorSpaceRGBChroma);
    colorBoxRGB(divColorSpaceRGBChroma, arrayColorSpaceRGBChromaRSP);
}
updateColorSpaceRGBChroma();


const canvasColorSpaceRGBChromaLuma = initializeCanvas("canvasColorSpaceRGBChromaLuma", 600);
const divColorSpaceRGBChromaLuma = document.getElementById("divColorSpaceRGBChromaLuma");
var arrayColorSpaceRGBChromaLumaRSP = [0, 0, 0];
var arrayColorSpaceRGBChromaLumaTransMat =  TRANSFMAT.map(row => row.slice());
var sliderColorSpaceRGBChromaLuma = [];
var progressColorSpaceRGBChromaLuma = [];
var varColorSpaceRGBChromaLumaSum = 0;
for (let i = 0; i < 3; i++) {
    sliderColorSpaceRGBChromaLuma[i] = document.getElementById(`sliderColorSpaceRGBChromaLuma${i}`);
    progressColorSpaceRGBChromaLuma[i] = document.getElementById(`progressColorSpaceRGBChromaLuma${i}`);
    initializeSliders(sliderColorSpaceRGBChromaLuma[i], 0.01, 0.98, 0.01, 0.33);
    initializeProgressBar(progressColorSpaceRGBChromaLuma[i], 0.98, 0.33);
    sliderColorSpaceRGBChromaLuma[i].addEventListener("input", updateColorSpaceRGBChromaLuma);
}
sliderColorSpaceRGBChromaLumaPan = document.getElementById("sliderColorSpaceRGBChromaLumaPan");
initializeSliders(sliderColorSpaceRGBChromaLumaPan, -120, 180, 1, -120);
sliderColorSpaceRGBChromaLumaPan.addEventListener("input", () => {
    changeTransformation(arrayColorSpaceRGBChromaLumaTransMat, sliderColorSpaceRGBChromaLumaPan.value, sliderColorSpaceRGBChromaLumaPan.min);
    updateColorSpaceRGBChromaLuma(); });
function updateColorSpaceRGBChromaLuma() {
    canvasColorSpaceRGBChromaLuma.clearRect(0, 0, WIDTH, 600);
    varColorSpaceRGBChromaLumaSum = 0;
    arrayColorSpaceRGBChromaLumaRSP = [sliderColorSpaceRGBChromaLuma[0].value, sliderColorSpaceRGBChromaLuma[1].value, sliderColorSpaceRGBChromaLuma[2].value];
    arrayColorSpaceRGBChromaLumaRSP.forEach((val, i) => varColorSpaceRGBChromaLumaSum += Number(val));
    arrayColorSpaceRGBChromaLumaRSP.forEach((val, i) => progressColorSpaceRGBChromaLuma[i].value = val / varColorSpaceRGBChromaLumaSum);
    drawSpaceAxes(canvasColorSpaceRGBChromaLuma, arrayColorSpaceRGBChromaLumaTransMat);
    drawSpaceSlice(canvasColorSpaceRGBChromaLuma, varColorSpaceRGBChromaLumaSum, arrayColorSpaceRGBChromaLumaTransMat);
    drawSpaceTriangle(canvasColorSpaceRGBChromaLuma, varColorSpaceRGBChromaLumaSum, arrayColorSpaceRGBChromaLumaTransMat, "#aaa");
    drawSpaceCube(canvasColorSpaceRGBChromaLuma, arrayColorSpaceRGBChromaLumaTransMat);
    drawSpacePoint(canvasColorSpaceRGBChromaLuma, arrayColorSpaceRGBChromaLumaRSP, arrayColorSpaceRGBChromaLumaTransMat);
    drawSpaceLabels(canvasColorSpaceRGBChromaLuma, RGBPM, arrayColorSpaceRGBChromaLumaTransMat);
    colorBoxRGB(divColorSpaceRGBChromaLuma, arrayColorSpaceRGBChromaLumaRSP);
}
updateColorSpaceRGBChromaLuma();


const canvasColorSpaceRGBChromaProject = initializeCanvas("canvasColorSpaceRGBChromaProject", 600);
const divColorSpaceRGBChromaProject = document.getElementById("divColorSpaceRGBChromaProject");
const arrayColorSpaceRGBChromaProjectRGBVals = [0.9, 0.6, 0.86];
var arrayColorSpaceRGBChromaProjectRSP = [0, 0, 0];
var arrayColorSpaceRGBChromaProjectNorms = [0, 0, 0];
var arrayColorSpaceRGBChromaProjectTransMat =  TRANSFMAT.map(row => row.slice());
var sliderColorSpaceRGBChromaProject = [];
var progressColorSpaceRGBChromaProject = [];
var varColorSpaceRGBChromaProjectSum = 0;
for (let i = 0; i < 3; i++) {
    sliderColorSpaceRGBChromaProject[i] = document.getElementById(`sliderColorSpaceRGBChromaProject${i}`);
    progressColorSpaceRGBChromaProject[i] = document.getElementById(`progressColorSpaceRGBChromaProject${i}`);
    initializeSliders(sliderColorSpaceRGBChromaProject[i], 0.01, 0.98, 0.01, arrayColorSpaceRGBChromaProjectRGBVals[i]);
    initializeProgressBar(progressColorSpaceRGBChromaProject[i], 0.98, arrayColorSpaceRGBChromaProjectRGBVals[i]);
    sliderColorSpaceRGBChromaProject[i].addEventListener("input", updateColorSpaceRGBChromaProject);
}
sliderColorSpaceRGBChromaProjectPan = document.getElementById("sliderColorSpaceRGBChromaProjectPan");
initializeSliders(sliderColorSpaceRGBChromaProjectPan, -120, 180, 1, 180);
sliderColorSpaceRGBChromaProjectPan.addEventListener("input", () => {
    changeTransformation(arrayColorSpaceRGBChromaProjectTransMat, sliderColorSpaceRGBChromaProjectPan.value, sliderColorSpaceRGBChromaProjectPan.min);
    updateColorSpaceRGBChromaProject(); });
function updateColorSpaceRGBChromaProject() {
    canvasColorSpaceRGBChromaProject.clearRect(0, 0, WIDTH, 600);
    varColorSpaceRGBChromaProjectSum = 0;
    arrayColorSpaceRGBChromaProjectRSP = [sliderColorSpaceRGBChromaProject[0].value, sliderColorSpaceRGBChromaProject[1].value, sliderColorSpaceRGBChromaProject[2].value];
    arrayColorSpaceRGBChromaProjectRSP.forEach((val, i) => varColorSpaceRGBChromaProjectSum += Number(val));
    arrayColorSpaceRGBChromaProjectRSP.forEach((val, i) => {
        arrayColorSpaceRGBChromaProjectNorms[i] = val / varColorSpaceRGBChromaProjectSum;
        progressColorSpaceRGBChromaProject[i].value = arrayColorSpaceRGBChromaProjectNorms[i];
    });
    drawSpaceAxes(canvasColorSpaceRGBChromaProject, arrayColorSpaceRGBChromaProjectTransMat);
    drawSpaceSlice(canvasColorSpaceRGBChromaProject, varColorSpaceRGBChromaProjectSum, arrayColorSpaceRGBChromaProjectTransMat);
    drawSpaceTriangle(canvasColorSpaceRGBChromaProject, 1, arrayColorSpaceRGBChromaProjectTransMat);
    drawSpaceTriangle(canvasColorSpaceRGBChromaProject, varColorSpaceRGBChromaProjectSum, arrayColorSpaceRGBChromaProjectTransMat, "#aaa");
    drawSpaceCube(canvasColorSpaceRGBChromaProject, arrayColorSpaceRGBChromaProjectTransMat);
    drawSpaceLine(canvasColorSpaceRGBChromaProject, arrayColorSpaceRGBChromaProjectNorms, arrayColorSpaceRGBChromaProjectRSP, arrayColorSpaceRGBChromaProjectTransMat);
    drawSpaceLine(canvasColorSpaceRGBChromaProject, arrayColorSpaceRGBChromaProjectNorms, [0, 0, 0], arrayColorSpaceRGBChromaProjectTransMat);
    drawSpacePoint(canvasColorSpaceRGBChromaProject, arrayColorSpaceRGBChromaProjectNorms, arrayColorSpaceRGBChromaProjectTransMat);
    drawSpacePoint(canvasColorSpaceRGBChromaProject, arrayColorSpaceRGBChromaProjectRSP, arrayColorSpaceRGBChromaProjectTransMat, "#aaa");
    drawSpaceLabels(canvasColorSpaceRGBChromaProject, RGBPM, arrayColorSpaceRGBChromaProjectTransMat);
    colorBoxRGB(divColorSpaceRGBChromaProject, arrayColorSpaceRGBChromaProjectRSP);
}
changeTransformation(arrayColorSpaceRGBChromaProjectTransMat, sliderColorSpaceRGBChromaProjectPan.value, sliderColorSpaceRGBChromaProjectPan.min);
updateColorSpaceRGBChromaProject();


const canvasChromaRGBLocus = initializeCanvas("canvasChromaRGBLocus", 600);
const sliderChromaRGBLocusWavelength = document.getElementById("sliderChromaRGBLocusWavelength");
const sliderChromaRGBLocusPan = document.getElementById("sliderChromaRGBLocusPan");
const arrayChromaRGBLocusBasisMat = [[205, 0, -60, BASEXOFF + 350], [0, -200, 40, BASEYOFF + 20]];
var arrayChromaRGBLocusRSP = [0, 0, 0];
var arrayChromaRGBLocusNorms = [0, 0, 0];
var arrayChromaRGBLocusTransMat =  arrayChromaRGBLocusBasisMat.map(row => row.slice());
var varChromaRGBLocusSum = 0;
initializeSliders(sliderChromaRGBLocusWavelength, 0, 125, 1, 10);
initializeSliders(sliderChromaRGBLocusPan, -120, 0, 0.5, -120);
sliderChromaRGBLocusWavelength.addEventListener("input", updateChromaRGBLocus);
sliderChromaRGBLocusPan.addEventListener("input", () => {
    changeTransformation(arrayChromaRGBLocusTransMat, sliderChromaRGBLocusPan.value, sliderChromaRGBLocusPan.min, 0.5, -0.33, -0.05, arrayChromaRGBLocusBasisMat);
    updateChromaRGBLocus(); });
function updateChromaRGBLocus() {
    canvasChromaRGBLocus.clearRect(0, 0, WIDTH, 600);
    varChromaRGBLocusSum = 0;
    getCMFValues(sliderChromaRGBLocusWavelength.value, arrayChromaRGBLocusRSP);
    arrayChromaRGBLocusRSP.forEach((val, i) => varChromaRGBLocusSum += Number(val));
    getCMFValues(sliderChromaRGBLocusWavelength.value, arrayChromaRGBLocusNorms, arrayCHRMATRGB);
    drawSpaceAxes(canvasChromaRGBLocus, arrayChromaRGBLocusTransMat);
    drawSpaceLocus(canvasChromaRGBLocus, arrayCOLMATRGB, arrayChromaRGBLocusTransMat, "#aaa");
    drawSpaceTriangle(canvasChromaRGBLocus, 1, arrayChromaRGBLocusTransMat);
    drawSpaceTriangle(canvasChromaRGBLocus, varChromaRGBLocusSum, arrayChromaRGBLocusTransMat, "#aaa");
    drawSpaceCube(canvasChromaRGBLocus, arrayChromaRGBLocusTransMat);
    drawSpaceLocus(canvasChromaRGBLocus, arrayCHRMATRGB, arrayChromaRGBLocusTransMat);
    drawSpaceLine(canvasChromaRGBLocus, arrayChromaRGBLocusNorms, arrayChromaRGBLocusRSP, arrayChromaRGBLocusTransMat);
    drawSpaceLine(canvasChromaRGBLocus, arrayChromaRGBLocusNorms, [0, 0, 0], arrayChromaRGBLocusTransMat);
    drawSpacePoint(canvasChromaRGBLocus, arrayChromaRGBLocusNorms, arrayChromaRGBLocusTransMat);
    drawSpacePoint(canvasChromaRGBLocus, arrayChromaRGBLocusRSP, arrayChromaRGBLocusTransMat, "#aaa");
    drawSpaceLabels(canvasChromaRGBLocus, RGBPM, arrayChromaRGBLocusTransMat);
}
updateChromaRGBLocus();


const canvasChromaXYZLocus = initializeCanvas("canvasChromaXYZLocus", 600);
const sliderChromaXYZLocusWavelength = document.getElementById("sliderChromaXYZLocusWavelength");
const sliderChromaXYZLocusPan = document.getElementById("sliderChromaXYZLocusPan");
const arrayChromaXYZLocusBasisMat = [[410, 0, -120, BASEXOFF], [0, -400, 80, BASEYOFF]];
var arrayChromaXYZLocusRSP = [0, 0, 0];
var arrayChromaXYZLocusNorms = [0, 0, 0];
var arrayChromaXYZLocusTransMat =  arrayChromaXYZLocusBasisMat.map(row => row.slice());
var varChromaXYZLocusSum = 0;
initializeSliders(sliderChromaXYZLocusWavelength, 0, 125, 1, 10);
initializeSliders(sliderChromaXYZLocusPan, -120, 0, 0.5, -120);
sliderChromaXYZLocusWavelength.addEventListener("input", updateChromaXYZLocus);
sliderChromaXYZLocusPan.addEventListener("input", () => {
    changeTransformation(arrayChromaXYZLocusTransMat, sliderChromaXYZLocusPan.value, sliderChromaXYZLocusPan.min, 1, -0.66, -0.1, arrayChromaXYZLocusBasisMat);
    updateChromaXYZLocus(); });
function updateChromaXYZLocus() {
    canvasChromaXYZLocus.clearRect(0, 0, WIDTH, 600);
    varChromaXYZLocusSum = 0;
    getCMFValues(sliderChromaXYZLocusWavelength.value, arrayChromaXYZLocusRSP, arrayCOLMATXYZ);
    arrayChromaXYZLocusRSP.forEach((val, i) => varChromaXYZLocusSum += Number(val));
    getCMFValues(sliderChromaXYZLocusWavelength.value, arrayChromaXYZLocusNorms, arrayCHRMATXYZ);
    drawSpaceAxes(canvasChromaXYZLocus, arrayChromaXYZLocusTransMat);
    drawSpaceLocus(canvasChromaXYZLocus, arrayCOLMATXYZ, arrayChromaXYZLocusTransMat, "#aaa");
    drawSpaceTriangle(canvasChromaXYZLocus, 1, arrayChromaXYZLocusTransMat);
    drawSpaceTriangle(canvasChromaXYZLocus, varChromaXYZLocusSum, arrayChromaXYZLocusTransMat, "#aaa");
    drawSpaceCube(canvasChromaXYZLocus, arrayChromaXYZLocusTransMat);
    drawSpaceLocus(canvasChromaXYZLocus, arrayCHRMATXYZ, arrayChromaXYZLocusTransMat);
    drawSpaceLine(canvasChromaXYZLocus, arrayChromaXYZLocusNorms, arrayChromaXYZLocusRSP, arrayChromaXYZLocusTransMat);
    drawSpaceLine(canvasChromaXYZLocus, arrayChromaXYZLocusNorms, [0, 0, 0], arrayChromaXYZLocusTransMat);
    drawSpacePoint(canvasChromaXYZLocus, arrayChromaXYZLocusNorms, arrayChromaXYZLocusTransMat);
    drawSpacePoint(canvasChromaXYZLocus, arrayChromaXYZLocusRSP, arrayChromaXYZLocusTransMat, "#aaa");
    drawSpaceLabels(canvasChromaXYZLocus, XYZPM, arrayChromaXYZLocusTransMat);
}
updateChromaXYZLocus();


const canvasLocus = initializeCanvas("canvasLocus", 600);
const sliderLocusWavelength = document.getElementById("sliderLocusWavelength");
var arrayLocusColor = [0, 0, 0];
var arrayLocusNorms = [0, 0, 0];
initializeSliders(sliderLocusWavelength, 0, 125, 1, 18);
sliderLocusWavelength.addEventListener("input", updateLocus);
function updateLocus() {
    getCMFValues(sliderLocusWavelength.value, arrayLocusColor, arrayCOLMATSRGB);
    getCMFValues(sliderLocusWavelength.value, arrayLocusNorms, arrayCHRMATXYZ);
    canvasLocus.clearRect(0, 0, WIDTH, 600);
    drawSpaceLocus(canvasLocus, arrayCHRMATXYZ, PROJMAT);
    drawSpacePoint(canvasLocus, arrayLocusNorms, PROJMAT);
    drawLabels(canvasLocus, WAVXYZLABELS, WAVXYZLABELPOS);
    colorBoxRGB(divLocus, arrayLocusColor);
    spanLocusWavelength.innerHTML = (sliderLocusWavelength.value * 2.8 + 380).toFixed(0) + "nm";
}
updateLocus();


const canvasLocusRatio = initializeCanvas("canvasLocusRatio", 600);
const arrayLocusRatioWavelengthVals = [35, 65];
var arrayLocusRatioIntensities = [0, 0];
var arrayLocusRatioCtrlPoints = [[0, 0, 0], [0, 0, 0]];
var arrayLocusRatioCtrlColors = [[0, 0, 0], [0, 0, 0]];
var arrayLocusRatioPoint = [0, 0, 0];
var arrayLocusRatioColor = [0, 0, 0];
var sliderLocusRatioWavelength = [];
var sliderLocusRatioIntensity = [];
for (let i = 0; i < 2; i++) {
    sliderLocusRatioWavelength[i] = document.getElementById(`sliderLocusRatioWavelength${i}`);
    sliderLocusRatioIntensity[i] = document.getElementById(`sliderLocusRatioIntensity${i}`);
    initializeSliders(sliderLocusRatioWavelength[i], 0, 125, 1, arrayLocusRatioWavelengthVals[i]);
    initializeSliders(sliderLocusRatioIntensity[i], 0, 1, 0.01, 1);
    sliderLocusRatioWavelength[i].addEventListener("input", updateLocusRatio);
    sliderLocusRatioIntensity[i].addEventListener("input", updateLocusRatio);
}
function updateLocusRatio() {
    for (let i = 0; i < 2; i++) {
        getCMFValues(sliderLocusRatioWavelength[i].value, arrayLocusRatioCtrlPoints[i], arrayCHRMATXYZ);
        getCMFValues(sliderLocusRatioWavelength[i].value, arrayLocusRatioCtrlColors[i], arrayCOLMATSRGB);
        arrayLocusRatioIntensities[i] = Number(sliderLocusRatioIntensity[i].value);
    }
    canvasLocusRatio.clearRect(0, 0, WIDTH, 600);
    drawSpaceLocus(canvasLocusRatio, arrayCHRMATXYZ, PROJMAT);
    drawSpaceLine(canvasLocusRatio, arrayLocusRatioCtrlPoints[0], arrayLocusRatioCtrlPoints[1], PROJMAT);
    drawSpacePoint(canvasLocusRatio, arrayLocusRatioCtrlPoints[0], PROJMAT, "#000", 6);
    drawSpacePoint(canvasLocusRatio, arrayLocusRatioCtrlPoints[1], PROJMAT, "#000", 6);
    getChromaticity(arrayLocusRatioCtrlPoints, arrayLocusRatioIntensities, arrayLocusRatioPoint, arrayLocusRatioColor);
    drawSpacePoint(canvasLocusRatio, arrayLocusRatioPoint, PROJMAT);
    getChromaticity(arrayLocusRatioCtrlColors, arrayLocusRatioIntensities, arrayLocusRatioPoint, arrayLocusRatioColor);
    drawLabels(canvasLocusRatio, WAVXYZLABELS, WAVXYZLABELPOS);
    colorBoxRGB(divLocusRatio, arrayLocusRatioColor);
}
updateLocusRatio();


const canvasLocusRatioMax = initializeCanvas("canvasLocusRatioMax", 600);
const arrayLocusRatioMaxWavelengthVals = [35, 65];
var arrayLocusRatioMaxIntensities = [0, 0];
var arrayLocusRatioMaxCtrlPoints = [[0, 0, 0], [0, 0, 0]];
var arrayLocusRatioMaxPoint = [0, 0, 0];
var arrayLocusRatioMaxColor = [0, 0, 0];
var sliderLocusRatioMaxWavelength = [];
var sliderLocusRatioMaxIntensity = [];
for (let i = 0; i < 2; i++) {
    sliderLocusRatioMaxWavelength[i] = document.getElementById(`sliderLocusRatioMaxWavelength${i}`);
    sliderLocusRatioMaxIntensity[i] = document.getElementById(`sliderLocusRatioMaxIntensity${i}`);
    initializeSliders(sliderLocusRatioMaxWavelength[i], 0, 125, 1, arrayLocusRatioMaxWavelengthVals[i]);
    initializeSliders(sliderLocusRatioMaxIntensity[i], 0.01, 2.99, 0.01, 1.5);
    sliderLocusRatioMaxWavelength[i].addEventListener("input", updateLocusRatioMax);
    sliderLocusRatioMaxIntensity[i].addEventListener("input", () => { normalizeSliders(sliderLocusRatioMaxIntensity, i, 3); updateLocusRatioMax(); });
}
function updateLocusRatioMax() {
    for (let i = 0; i < 2; i++) {
        getCMFValues(sliderLocusRatioMaxWavelength[i].value, arrayLocusRatioMaxCtrlPoints[i], arrayCHRMATXYZ);
        arrayLocusRatioMaxIntensities[i] = Number(sliderLocusRatioMaxIntensity[i].value);
    }
    canvasLocusRatioMax.clearRect(0, 0, WIDTH, 600);
    drawSpaceLocus(canvasLocusRatioMax, arrayCHRMATXYZ, PROJMAT);
    drawSpaceLine(canvasLocusRatioMax, arrayLocusRatioMaxCtrlPoints[0], arrayLocusRatioMaxCtrlPoints[1], PROJMAT);
    drawSpacePoint(canvasLocusRatioMax, arrayLocusRatioMaxCtrlPoints[0], PROJMAT, "#000", 6);
    drawSpacePoint(canvasLocusRatioMax, arrayLocusRatioMaxCtrlPoints[1], PROJMAT, "#000", 6);
    getChromaticity(arrayLocusRatioMaxCtrlPoints, arrayLocusRatioMaxIntensities, arrayLocusRatioMaxPoint, arrayLocusRatioMaxColor);
    drawSpacePoint(canvasLocusRatioMax, arrayLocusRatioMaxPoint, PROJMAT);
    drawLabels(canvasLocusRatioMax, WAVXYZLABELS, WAVXYZLABELPOS);
    colorBoxRGB(divLocusRatioMax, vectorMultiply(MATRIX_XYZ_RGB, arrayLocusRatioMaxColor));
}
updateLocusRatioMax();


CHRDIAGRAM.onload = () => {
    updateLocusRatioColored();
    updateLocusRatioGrid();
    updateLocusGamut();
    updateLocusGamutCIE();
    updateLocusGamutMultiple();
    updateBlackbodyColor();
    updateLocusPlanckianLED();
    updateLocusPlanckianCCT();
    updateLocusIlluminants();
    updateLocusWhitePoint();
}


const canvasLocusRatioColored = initializeCanvas("canvasLocusRatioColored", 600);
const arrayLocusRatioColoredWavelengthVals = [35, 65];
var arrayLocusRatioColoredIntensities = [0, 0];
var arrayLocusRatioColoredCtrlPoints = [[0, 0, 0], [0, 0, 0]];
var arrayLocusRatioColoredPoint = [0, 0, 0];
var arrayLocusRatioColoredColor = [0, 0, 0];
var sliderLocusRatioColoredWavelength = [];
var sliderLocusRatioColoredIntensity = [];
for (let i = 0; i < 2; i++) {
    sliderLocusRatioColoredWavelength[i] = document.getElementById(`sliderLocusRatioColoredWavelength${i}`);
    sliderLocusRatioColoredIntensity[i] = document.getElementById(`sliderLocusRatioColoredIntensity${i}`);
    initializeSliders(sliderLocusRatioColoredWavelength[i], 0, 125, 1, arrayLocusRatioColoredWavelengthVals[i]);
    initializeSliders(sliderLocusRatioColoredIntensity[i], 0.01, 2.99, 0.01, 1.5);
    sliderLocusRatioColoredWavelength[i].addEventListener("input", updateLocusRatioColored);
    sliderLocusRatioColoredIntensity[i].addEventListener("input", () => { normalizeSliders(sliderLocusRatioColoredIntensity, i, 3); updateLocusRatioColored(); });
}
function updateLocusRatioColored() {
    for (let i = 0; i < 2; i++) {
        getCMFValues(sliderLocusRatioColoredWavelength[i].value, arrayLocusRatioColoredCtrlPoints[i], arrayCHRMATXYZ);
        arrayLocusRatioColoredIntensities[i] = Number(sliderLocusRatioColoredIntensity[i].value);
    }
    canvasLocusRatioColored.clearRect(0, 0, WIDTH, 600);
    drawSpaceChroma(canvasLocusRatioColored);
    drawSpaceLocus(canvasLocusRatioColored, arrayCHRMATXYZ, PROJMAT);
    drawSpaceLine(canvasLocusRatioColored, arrayLocusRatioColoredCtrlPoints[0], arrayLocusRatioColoredCtrlPoints[1], PROJMAT);
    drawSpacePoint(canvasLocusRatioColored, arrayLocusRatioColoredCtrlPoints[0], PROJMAT, "#000", 6);
    drawSpacePoint(canvasLocusRatioColored, arrayLocusRatioColoredCtrlPoints[1], PROJMAT, "#000", 6);
    getChromaticity(arrayLocusRatioColoredCtrlPoints, arrayLocusRatioColoredIntensities, arrayLocusRatioColoredPoint, arrayLocusRatioColoredColor);
    drawSpacePoint(canvasLocusRatioColored, arrayLocusRatioColoredPoint, PROJMAT);
    drawLabels(canvasLocusRatioColored, WAVXYZLABELS, WAVXYZLABELPOS);
    colorBoxRGB(divLocusRatioColored, vectorMultiply(MATRIX_XYZ_RGB, arrayLocusRatioColoredColor));
}


const canvasLocusRatioGrid = initializeCanvas("canvasLocusRatioGrid", 600);
const spanLocusRatioGridx = document.getElementById("spanLocusRatioGridx");
const spanLocusRatioGridy = document.getElementById("spanLocusRatioGridy");
const arrayLocusRatioGridWavelengthVals = [41, 87];
var arrayLocusRatioGridIntensities = [0, 0];
var arrayLocusRatioGridCtrlPoints = [[0, 0, 0], [0, 0, 0]];
var arrayLocusRatioGridPoint = [0, 0, 0];
var arrayLocusRatioGridColor = [0, 0, 0];
var sliderLocusRatioGridWavelength = [];
var sliderLocusRatioGridIntensity = [];
for (let i = 0; i < 2; i++) {
    sliderLocusRatioGridWavelength[i] = document.getElementById(`sliderLocusRatioGridWavelength${i}`);
    sliderLocusRatioGridIntensity[i] = document.getElementById(`sliderLocusRatioGridIntensity${i}`);
    initializeSliders(sliderLocusRatioGridWavelength[i], 0, 125, 1, arrayLocusRatioGridWavelengthVals[i]);
    initializeSliders(sliderLocusRatioGridIntensity[i], 0.01, 2.99, 0.01, 1.5);
    sliderLocusRatioGridWavelength[i].addEventListener("input", updateLocusRatioGrid);
    sliderLocusRatioGridIntensity[i].addEventListener("input", () => { normalizeSliders(sliderLocusRatioGridIntensity, i, 3); updateLocusRatioGrid(); });
}
function updateLocusRatioGrid() {
    for (let i = 0; i < 2; i++) {
        getCMFValues(sliderLocusRatioGridWavelength[i].value, arrayLocusRatioGridCtrlPoints[i], arrayCHRMATXYZ);
        arrayLocusRatioGridIntensities[i] = Number(sliderLocusRatioGridIntensity[i].value);
    }
    canvasLocusRatioGrid.clearRect(0, 0, WIDTH, 600);
    drawSpaceChroma(canvasLocusRatioGrid);
    for (let y = 0; y < 0.9; y += 0.05) drawSpaceLine(canvasLocusRatioGrid, [0, y, 0], [0.8, y, 0], PROJMAT, "#aaa");
    for (let x = 0; x < 0.8; x += 0.05) drawSpaceLine(canvasLocusRatioGrid, [x, 0, 0], [x, 1, 0], PROJMAT, "#aaa");
    drawSpaceAxes(canvasLocusRatioGrid, PROJMAT);
    drawLabels(canvasLocusRatioGrid, ["x", "y"], [[PROJMAT[0][3] - 30, 31], [PROJMAT[0][0] + 30, PROJMAT[1][3] - 30]]);
    drawSpaceLocus(canvasLocusRatioGrid, arrayCHRMATXYZ, PROJMAT);
    drawSpaceLine(canvasLocusRatioGrid, arrayLocusRatioGridCtrlPoints[0], arrayLocusRatioGridCtrlPoints[1], PROJMAT);
    drawSpacePoint(canvasLocusRatioGrid, arrayLocusRatioGridCtrlPoints[0], PROJMAT, "#000", 6);
    drawSpacePoint(canvasLocusRatioGrid, arrayLocusRatioGridCtrlPoints[1], PROJMAT, "#000", 6);
    getChromaticity(arrayLocusRatioGridCtrlPoints, arrayLocusRatioGridIntensities, arrayLocusRatioGridPoint, arrayLocusRatioGridColor);
    drawSpacePoint(canvasLocusRatioGrid, arrayLocusRatioGridPoint, PROJMAT);
    colorBoxRGB(divLocusRatioGrid, vectorMultiply(MATRIX_XYZ_RGB, arrayLocusRatioGridColor));
    spanLocusRatioGridx.innerHTML = "x: " + arrayLocusRatioGridPoint[0].toFixed(3);
    spanLocusRatioGridy.innerHTML = "y: " + arrayLocusRatioGridPoint[1].toFixed(3);
}


const canvasLocusGamut = initializeCanvas("canvasLocusGamut", 600);
const arrayLocusGamutWavelengthVals = [85, 65, 35];
var arrayLocusGamutIntensities = [0, 0];
var arrayLocusGamutCtrlPoints = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var arrayLocusGamutPoint = [0, 0, 0];
var arrayLocusGamutColor = [0, 0, 0];
var sliderLocusGamutWavelength = [];
var sliderLocusGamutIntensity = [];
for (let i = 0; i < 3; i++) {
    sliderLocusGamutWavelength[i] = document.getElementById(`sliderLocusGamutWavelength${i}`);
    sliderLocusGamutIntensity[i] = document.getElementById(`sliderLocusGamutIntensity${i}`);
    initializeSliders(sliderLocusGamutWavelength[i], 0, 125, 1, arrayLocusGamutWavelengthVals[i]);
    initializeSliders(sliderLocusGamutIntensity[i], 0.01, 2.99, 0.01, 1);
    sliderLocusGamutWavelength[i].addEventListener("input", updateLocusGamut);
    sliderLocusGamutIntensity[i].addEventListener("input", () => { normalizeSliders(sliderLocusGamutIntensity, i, 3); updateLocusGamut(); });
}
function updateLocusGamut() {
    for (let i = 0; i < 3; i++) {
        getCMFValues(sliderLocusGamutWavelength[i].value, arrayLocusGamutCtrlPoints[i], arrayCHRMATXYZ);
        arrayLocusGamutIntensities[i] = Number(sliderLocusGamutIntensity[i].value);
    }
    canvasLocusGamut.clearRect(0, 0, WIDTH, 600);
    drawSpaceChroma(canvasLocusGamut);
    drawSpaceLocus(canvasLocusGamut, arrayCHRMATXYZ, PROJMAT);
    drawGamut(canvasLocusGamut, arrayLocusGamutCtrlPoints, arrayLocusGamutIntensities);
    getChromaticity(arrayLocusGamutCtrlPoints, arrayLocusGamutIntensities, arrayLocusGamutPoint, arrayLocusGamutColor);
    drawSpacePoint(canvasLocusGamut, arrayLocusGamutPoint, PROJMAT);
    drawLabels(canvasLocusGamut, WAVXYZLABELS, WAVXYZLABELPOS);
    colorBoxRGB(divLocusGamut, vectorMultiply(MATRIX_XYZ_RGB, arrayLocusGamutColor));
}


const canvasLocusGamutCIE = initializeCanvas("canvasLocusGamutCIE", 600);
var arrayLocusGamutCIECtrlPoints = XYCIERGB;
var arrayLocusGamutCIEWhitePoint = [1, 1, 1];
var arrayLocusGamutCIEIntensities = [0, 0];
var arrayLocusGamutCIEPoint = [0, 0, 0];
var arrayLocusGamutCIEColor = [0, 0, 0];
var sliderLocusGamutCIEIntensity = [];
for (let i = 0; i < 3; i++) {
    sliderLocusGamutCIEIntensity[i] = document.getElementById(`sliderLocusGamutCIEIntensity${i}`);
    initializeSliders(sliderLocusGamutCIEIntensity[i], 0.01, 2.99, 0.01, 1);
    sliderLocusGamutCIEIntensity[i].addEventListener("input", () => { normalizeSliders(sliderLocusGamutCIEIntensity, i, 3); updateLocusGamutCIE(); });
}
function updateLocusGamutCIE() {
    for (let i = 0; i < 3; i++) arrayLocusGamutCIEIntensities[i] = sliderLocusGamutCIEIntensity[i].value * arrayLocusGamutCIEWhitePoint[i];
    canvasLocusGamutCIE.clearRect(0, 0, WIDTH, 600);
    drawSpaceChroma(canvasLocusGamutCIE);
    drawSpaceLocus(canvasLocusGamutCIE, arrayCHRMATXYZ, PROJMAT);
    drawGamut(canvasLocusGamutCIE, arrayLocusGamutCIECtrlPoints, arrayLocusGamutCIEIntensities);
    getChromaticity(arrayLocusGamutCIECtrlPoints, arrayLocusGamutCIEIntensities, arrayLocusGamutCIEPoint, arrayLocusGamutCIEColor);
    drawSpacePoint(canvasLocusGamutCIE, arrayLocusGamutCIEPoint, PROJMAT);
    drawLabels(canvasLocusGamutCIE, WAVXYZLABELS, WAVXYZLABELPOS);
    colorBoxRGB(divLocusGamutCIE, vectorMultiply(MATRIX_XYZ_RGB, arrayLocusGamutCIEColor));
}


const canvasLocusGamutMultiple = initializeCanvas("canvasLocusGamutMultiple", 600);
var varLocusGamutMultipleCurrentName = [COLSPACENAMES[2]];
var arrayLocusGamutMultipleCtrlPoints = COLSPACES[2];
var arrayLocusGamutMultipleWhitePoint = [0.577, 1.136, 1.286];
var arrayLocusGamutMultipleIntensities = [0, 0, 0];
var arrayLocusGamutMultiplePoint = [0, 0, 0];
var arrayLocusGamutMultipleColor = [0, 0, 0];
var sliderLocusGamutMultipleIntensity = [];
var linkLocusGamutMultiple = [];
for (let i = 0; i < 3; i++) {
    sliderLocusGamutMultipleIntensity[i] = document.getElementById(`sliderLocusGamutMultipleIntensity${i}`);
    initializeSliders(sliderLocusGamutMultipleIntensity[i], 0.01, 2.99, 0.01, 1);
    sliderLocusGamutMultipleIntensity[i].addEventListener("input", () => {
        normalizeSliders(sliderLocusGamutMultipleIntensity, i, 3); updateLocusGamutMultiple(); });
} for (let i = 0; i < 2; i++) {
    linkLocusGamutMultiple[i] = document.getElementById(`linkLocusGamutMultiple${i}`);
    linkLocusGamutMultiple[i].addEventListener("click", () => {
        arrayLocusGamutMultipleCtrlPoints = COLSPACES[i];
        getWhitePoint(arrayLocusGamutMultipleCtrlPoints, arrayXYILLS[3], arrayLocusGamutMultipleWhitePoint);
        varLocusGamutMultipleCurrentName = [COLSPACENAMES[i]];
        updateLocusGamutMultiple();
    });
}
function updateLocusGamutMultiple() {
    for (let i = 0; i < 3; i++) arrayLocusGamutMultipleIntensities[i] = sliderLocusGamutMultipleIntensity[i].value * arrayLocusGamutMultipleWhitePoint[i];
    canvasLocusGamutMultiple.clearRect(0, 0, WIDTH, 600);
    drawSpaceChroma(canvasLocusGamutMultiple);
    drawSpaceLocus(canvasLocusGamutMultiple, arrayCHRMATXYZ, PROJMAT);
    drawGamut(canvasLocusGamutMultiple, arrayLocusGamutMultipleCtrlPoints, arrayLocusGamutMultipleIntensities);
    getChromaticity(arrayLocusGamutMultipleCtrlPoints, arrayLocusGamutMultipleIntensities, arrayLocusGamutMultiplePoint, arrayLocusGamutMultipleColor);
    drawSpacePoint(canvasLocusGamutMultiple, arrayLocusGamutMultiplePoint, PROJMAT);
    drawLabels(canvasLocusGamutMultiple, WAVXYZLABELS, WAVXYZLABELPOS);
    drawLabels(canvasLocusGamutMultiple, varLocusGamutMultipleCurrentName, [[801, 151]]);
    colorBoxRGB(divLocusGamutMultiple, vectorMultiply(MATRIX_XYZ_RGB, arrayLocusGamutMultipleColor));
}


const canvasBlackbodyColorSPD = initializeCanvas("canvasBlackbodyColorSPD", 300);
const canvasBlackbodyColorSSC = initializeCanvas("canvasBlackbodyColorSSC", 300);
const canvasBlackbodyColorRSP = initializeCanvas("canvasBlackbodyColorRSP", 200);
const canvasLocusPlanckian = initializeCanvas("canvasLocusPlanckian", 600);
const sliderBlackbodyColorTemperature = document.getElementById("sliderBlackbodyColorTemperature");
const spanBlackbodyColor = document.getElementById("spanBlackbodyColor");
var arrayBlackbodyColorSPD = new Array(126).fill(0);
var arrayLocusPlanckianPoint = [0, 0, 0];
var arrayBlackbodyColorRSP = [0, 0, 0];
initializeSliders(sliderBlackbodyColorTemperature, 0.02, 0.9, 0.02, 0.54);
sliderBlackbodyColorTemperature.addEventListener("input", updateBlackbodyColor);
drawSSC(canvasBlackbodyColorSSC);
function updateBlackbodyColor() {
    canvasBlackbodyColorSPD.clearRect(0, 0, WIDTH, 300);
    canvasBlackbodyColorRSP.clearRect(0, 0, WIDTH, 200);
    canvasLocusPlanckian.clearRect(0, 0, WIDTH, 600);
    getCMFValues(Math.round(sliderBlackbodyColorTemperature.value * 50 - 1), arrayLocusPlanckianPoint, arrayPLANCKXYZ);
    getSPDBlackbody(sliderBlackbodyColorTemperature.value, arrayBlackbodyColorSPD);
    drawSPD(canvasBlackbodyColorSPD, arrayBlackbodyColorSPD);
    arrayBlackbodyColorRSP = drawRSP(canvasBlackbodyColorRSP, arrayBlackbodyColorSPD);
    drawSpaceChroma(canvasLocusPlanckian);
    drawSpaceLocus(canvasLocusPlanckian, arrayCHRMATXYZ, PROJMAT);
    drawSpaceLocus(canvasLocusPlanckian, arrayPLANCKXYZ, PROJMAT);
    drawSpacePoint(canvasLocusPlanckian, arrayLocusPlanckianPoint, PROJMAT);
    drawLabels(canvasLocusPlanckian, WAVXYZLABELS, WAVXYZLABELPOS);
    colorBoxRGB(divBlackbodyColor, vectorMultiply(MATRIX_TEMP_SRGB, arrayBlackbodyColorRSP));
}


const canvasLocusPlanckianLED = initializeCanvas("canvasLocusPlanckianLED", 600);
const arrayLocusPlanckianLEDPoints = [[0.330, 0.320, 0], [0.355, 0.385, 0], [0.345, 0.355, 0], [0.355, 0.325, 0], [0.308, 0.305, 0], [0.313, 0.345, 0]];
function updateLocusPlanckianLED() {
    drawSpaceChroma(canvasLocusPlanckianLED);
    drawSpaceLocus(canvasLocusPlanckianLED, arrayCHRMATXYZ, PROJMAT);
    drawSpaceLocus(canvasLocusPlanckianLED, arrayPLANCKXYZ, PROJMAT);
    drawLabels(canvasLocusPlanckianLED, WAVXYZLABELS, WAVXYZLABELPOS);
    for (let i = 0; i < arrayLocusPlanckianLEDPoints.length; i++)
        drawSpacePoint(canvasLocusPlanckianLED, arrayLocusPlanckianLEDPoints[i], PROJMAT, "#000", 6);
}


const canvasLocusPlanckianCCT = initializeCanvas("canvasLocusPlanckianCCT", 600);
const arrayLocusPlanckianCCTWavelengths =  [...WAVXYZLABELS.slice(0, 3), ...WAVXYZLABELS.slice(4)];
const arrayLocusPlanckianCCTWavelengthsPos =  [...WAVXYZLABELPOS.slice(0, 3), ...WAVXYZLABELPOS.slice(4)];
function updateLocusPlanckianCCT() {
    drawSpaceChroma(canvasLocusPlanckianCCT);
    drawSpaceLocus(canvasLocusPlanckianCCT, arrayCHRMATXYZ, PROJMAT);
    drawSpaceLocus(canvasLocusPlanckianCCT, arrayPLANCKXYZ, PROJMAT);
    drawLabels(canvasLocusPlanckianCCT, arrayLocusPlanckianCCTWavelengths, arrayLocusPlanckianCCTWavelengthsPos);
    drawLabels(canvasLocusPlanckianCCT, CCTTEMPS, CCTTEMPSPOS, "#000", "20px JetBrains Mono");
    for (let i = 0; i < CCTLINES.length; i++)
        drawSpaceLine(canvasLocusPlanckianCCT, CCTLINES[i][0], CCTLINES[i][1], PROJMAT);
}


const canvasLocusIlluminants = initializeCanvas("canvasLocusIlluminants", 600);
const selectLocusIlluminants = document.getElementById("selectLocusIlluminants");
const linkLocusIlluminants = document.getElementById("linkLocusIlluminants");
XYILLNAMES.forEach((element, index) => {
    let newOption = document.createElement("option");
    newOption.value = index; newOption.text = element;
    selectLocusIlluminants.appendChild(newOption);
});
selectLocusIlluminants.value = 3;
selectLocusIlluminants.addEventListener("input", updateLocusIlluminants);
linkLocusIlluminants.addEventListener("click", () => {
    selectLocusIlluminants.value = (selectLocusIlluminants.value * 1 + 1) % arrayXYILLS.length;
    updateLocusIlluminants(); });
function updateLocusIlluminants() {
    canvasLocusIlluminants.clearRect(0, 0, WIDTH, 600);
    varLocusIlluminantsCurrent = arrayXYILLS[selectLocusIlluminants.value];
    drawSpaceChroma(canvasLocusIlluminants);
    drawSpaceLocus(canvasLocusIlluminants, arrayCHRMATXYZ, PROJMAT);
    drawSpaceLocus(canvasLocusIlluminants, arrayPLANCKXYZ, PROJMAT);
    drawSpacePoint(canvasLocusIlluminants, varLocusIlluminantsCurrent, PROJMAT, "#000", 6);
    drawLabels(canvasLocusIlluminants, WAVXYZLABELS, WAVXYZLABELPOS);
    colorBoxRGB(divLocusIlluminants, vectorMultiply([[3, 0, 0], [0, 3, 0], [0, 0, 3]], vectorMultiply(MATRIX_XYZ_RGB, varLocusIlluminantsCurrent)));
    for (let i = 0; i < CCTLINES.length; i++)
        drawSpaceLine(canvasLocusIlluminants, CCTLINES[i][0], CCTLINES[i][1], PROJMAT);
}


const canvasLocusWhitePoint = initializeCanvas("canvasLocusWhitePoint", 600);
const selectLocusWhitePoint = document.getElementById("selectLocusWhitePoint");
const selectLocusWhitePointSpace = document.getElementById("selectLocusWhitePointSpace");
const divLocusWhitePoint = document.getElementById("divLocusWhitePoint");
const divLocusWhitePointAdj = document.getElementById("divLocusWhitePointAdj");
var varLocusWhitePointCurrentName = [COLSPACENAMES[0]];
var arrayLocusWhitePointCtrlPoints = COLSPACES[0];
var arrayLocusWhitePointWhitePoint = [0.638, 1.175, 1.186];
var arrayLocusWhitePointWhitePointE = [0.775, 1.129, 1.096];
var arrayLocusWhitePointIntensities = [0, 0, 0];
var arrayLocusWhitePointPoint = [0, 0, 0];
var arrayLocusWhitePointColor = [0, 0, 0];
var sliderLocusWhitePointIntensity = [];
for (let i = 0; i < 3; i++) {
    sliderLocusWhitePointIntensity[i] = document.getElementById(`sliderLocusWhitePointIntensity${i}`);
    initializeSliders(sliderLocusWhitePointIntensity[i], 0.01, 2.99, 0.01, 1);
    sliderLocusWhitePointIntensity[i].addEventListener("input", () => {
        normalizeSliders(sliderLocusWhitePointIntensity, i, 3); updateLocusWhitePoint(); });
}
XYILLNAMES.forEach((element, index) => {
    let newOption = document.createElement("option");
    newOption.value = index; newOption.text = element;
    selectLocusWhitePoint.appendChild(newOption);
});
COLSPACENAMES.forEach((element, index) => {
    let newOption = document.createElement("option");
    newOption.value = index; newOption.text = element;
    selectLocusWhitePointSpace.appendChild(newOption);
});
selectLocusWhitePoint.value = 3;
selectLocusWhitePoint.addEventListener("input", () => {
    getWhitePoint(arrayLocusWhitePointCtrlPoints, arrayXYILLS[selectLocusWhitePoint.value], arrayLocusWhitePointWhitePoint);
    updateLocusWhitePoint();
});
selectLocusWhitePointSpace.addEventListener("input", () => {
    arrayLocusWhitePointCtrlPoints = COLSPACES[selectLocusWhitePointSpace.value];
    varLocusWhitePointCurrentName = [COLSPACENAMES[selectLocusWhitePointSpace.value]];
    getWhitePoint(arrayLocusWhitePointCtrlPoints, arrayXYILLS[selectLocusWhitePoint.value], arrayLocusWhitePointWhitePoint);
    getWhitePoint(arrayLocusWhitePointCtrlPoints, XYE, arrayLocusWhitePointWhitePointE);
    updateLocusWhitePoint();
});
function updateLocusWhitePoint() {
    canvasLocusWhitePoint.clearRect(0, 0, WIDTH, 600);
    drawSpaceChroma(canvasLocusWhitePoint);
    for (let i = 0; i < 3; i++) arrayLocusWhitePointIntensities[i] = sliderLocusWhitePointIntensity[i].value * arrayLocusWhitePointWhitePointE[i];
    getChromaticity(arrayLocusWhitePointCtrlPoints, arrayLocusWhitePointIntensities, arrayLocusWhitePointPoint, arrayLocusWhitePointColor);
    drawGamut(canvasLocusWhitePoint, arrayLocusWhitePointCtrlPoints, arrayLocusWhitePointIntensities, PROJMAT, "#999");
    drawSpacePoint(canvasLocusWhitePoint, arrayLocusWhitePointPoint, PROJMAT, "#999");
    colorBoxRGB(divLocusWhitePointAdj, vectorMultiply(MATRIX_XYZ_RGB, arrayLocusWhitePointColor));
    for (let i = 0; i < 3; i++) arrayLocusWhitePointIntensities[i] = sliderLocusWhitePointIntensity[i].value * arrayLocusWhitePointWhitePoint[i];
    getChromaticity(arrayLocusWhitePointCtrlPoints, arrayLocusWhitePointIntensities, arrayLocusWhitePointPoint, arrayLocusWhitePointColor);
    drawSpaceLocus(canvasLocusWhitePoint, arrayCHRMATXYZ, PROJMAT);
    drawGamut(canvasLocusWhitePoint, arrayLocusWhitePointCtrlPoints, arrayLocusWhitePointIntensities);
    drawSpacePoint(canvasLocusWhitePoint, arrayLocusWhitePointPoint, PROJMAT);
    drawLabels(canvasLocusWhitePoint, WAVXYZLABELS, WAVXYZLABELPOS);
    drawLabels(canvasLocusWhitePoint, varLocusWhitePointCurrentName, [[801, 151]]);
    varLocusWhitePointCurrent = arrayXYILLS[selectLocusWhitePoint.value];
    colorBoxRGB(divLocusWhitePoint, vectorMultiply(MATRIX_XYZ_RGB, arrayLocusWhitePointColor));
}




// functions

function getWhitePoint(points, whitePoint, intensities) {
    let det = ((points[0][0] - points[2][0]) * (points[1][1] - points[2][1])) - ((points[1][0] - points[2][0]) * (points[0][1] - points[2][1]));
    intensities[0] = 3 * (((points[1][1] - points[2][1]) * (whitePoint[0] - points[2][0])) - ((points[1][0] - points[2][0]) * (whitePoint[1] - points[2][1]))) / det;
    intensities[1] = 3 * (((points[0][0] - points[2][0]) * (whitePoint[1] - points[2][1])) - ((points[0][1] - points[2][1]) * (whitePoint[0] - points[2][0]))) / det;
    intensities[2] = 3 - intensities[0] - intensities[1];
}

function getSPDBlackbody(temperature, spdArray) {
    let k = 0.005 * 0.005 * temperature * temperature;
    let c = 2.1 ** (1 / temperature);
    for (let i = 70; i < 196; i++)
        spdArray[i - 70] = 1 / ((i ** 2) * k * (c ** (200 / i)));
//    more accurate curve
//    let k = (temperature ** -5) * 0.047;
//    for (let i = 100; i < 226; i++)
//        spdArray[i - 100] = k / (((i / 600) ** 5) * (2.72 ** (600 / (i * temperature))));
}

function drawCircles(canvas, x, y, color = "#000", radius = 100) {
    canvas.fillStyle = color;
    canvas.beginPath();
    canvas.arc(x, y, radius, 0, 2 * Math.PI);
    canvas.fill();
}

function drawGamut(canvas, points, intensities, projection = PROJMAT, color = "#000") {
    let endPoints = [[0, 0, 0], [0, 0, 0]];
    let median = [0, 0, 0];
    let endIntensities = [0, 0];
    for (let i = 0; i < 3; i++) {
        drawSpaceLine(canvas, points[i], points[(i + 1) % 3], projection, color);
        drawSpacePoint(canvas, points[i], projection, color, 6);
        endPoints[0] = points[i]; endPoints[1] = points[(i + 1) % 3];
        endIntensities[0] = intensities[i]; endIntensities[1] = intensities[(i + 1) % 3];
        getChromaticity(endPoints, endIntensities, median, median);
        drawSpaceLine(canvas, points[(i + 2) % 3], median, projection, color);
        drawSpacePoint(canvas, median, projection, color, 6);
    }
}

function drawSpaceChroma(canvas, diagram = CHRDIAGRAM, locus = arrayCHRMATXYZ, projection = PROJMAT) {
    canvas.drawImage(diagram, 130, 10, 550, 590);
    canvas.fillStyle = "#fff";
    canvas.beginPath();
    canvas.moveTo(120, 10);
    canvas.lineTo(690, 10);
    canvas.lineTo(690, 610);
    canvas.lineTo(120, 610);
    canvas.moveTo(locus[0][0] * projection[0][0] + projection[0][3], locus[1][0] * projection[1][1] + projection[1][3])
    for (let i = 1; i < locus[0].length; i++)
        canvas.lineTo(locus[0][i] * projection[0][0] + projection[0][3], locus[1][i] * projection[1][1] + projection[1][3])
    canvas.fill('evenodd');
}

function getChromaticity(array, intensities, norms, total) {
    let totalIntensity = 0;
    for (let i = 0; i < array.length; i++) totalIntensity += intensities[i];
    for (let i = 0; i < 3; i++) total[i] = 0;
    for (let i = 0; i < array.length; i++) {
        total[0] += intensities[i] * array[i][0];
        total[1] += intensities[i] * array[i][1];
        total[2] += intensities[i] * array[i][2];
    }
    for (let i = 0; i < array.length; i++) norms[i] = total[i] / totalIntensity;
}

function changeTransformation(array, value, range, xz = 0.85, yz = -0.25, xx = -0.05, original = TRANSFMAT) {
    array[0][2] = original[0][2] - range * xz + value * xz;
    array[1][2] = original[1][2] - range * yz + value * yz;
    array[0][0] = original[0][0] - range * xx + value * xx;
}

function normalizeSliders(sliderArray, current, total = 1) {
    let norm = 0;
    let sliders = sliderArray.length;
    for (let i = 1; i < sliders; i++) norm += Number(sliderArray[(current + i) % sliders].value);
    norm = (total - sliderArray[current].value) / norm;
    for (let i = 1; i < sliders; i++)
    sliderArray[(current + i) % sliders].value *= norm;
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
    let coordinates = [locus[0][0], locus[1][0], locus[2][0], 1];
    let points = vectorMultiply(transformation, coordinates);
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    canvas.beginPath();
    canvas.moveTo(points[0], points[1]);
    for (let i = 1; i < locus[0].length; i++) {
        coordinates = [locus[0][i], locus[1][i], locus[2][i], 1];
        points = vectorMultiply(transformation, coordinates);
        canvas.lineTo(points[0], points[1]);
    }
    canvas.stroke();
}

function drawSpaceLine(canvas, pointA, pointB, transformation = TRANSFMAT, color = "#000", width = 2) {
    canvas.lineWidth = width;
    canvas.strokeStyle = color;
    pointA = vectorMultiply(transformation, pointA.concat(1));
    pointB = vectorMultiply(transformation, pointB.concat(1));
    canvas.beginPath();
    canvas.moveTo(pointA[0], pointA[1]);
    canvas.lineTo(pointB[0], pointB[1]);
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

function drawSpaceSlice(canvas, k = 1, transformation = TRANSFMAT) {
    const resolution = 1 / (50 * k);
    let vertex = [0, 0, 0, 1];
    let points = [0, 0];
    let color = [0, 0, 0];
    let r = g = 0;
    for (let i = 0; i < 1; i += resolution) {
        for (let j = resolution; j < 1; j += resolution) {
            r = i * k; g = j * k;
            if (r > 1 || g > 1 || k - r - g > 1 || r + g - k > 0) continue;
            vertex[0] = color[0] = r;
            vertex[1] = color[1] = g;
            vertex[2] = color[2] = k - r - g;
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

function drawLabels(canvas, labels, positions, color = "#000", font = "25px JetBrains Mono", horizontal = "center", vertical = "middle") {
    initializeCanvasText(canvas, color, horizontal, vertical, font);
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
    let x, y = 0;
    const rect = canvas.getBoundingClientRect();
    if (evt.touches) { x = evt.touches[0].clientX; y = evt.touches[0].clientY; }
    else { x = evt.clientX; y = evt.clientY; }
    let wavelengthBin = (x - rect.left) * (canvas.width / rect.width);
    let intensity = (y - rect.top) * (canvas.height / rect.height);
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
    if (wavelength < 460 || wavelength > 610) { div.style.color = "#fff";
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

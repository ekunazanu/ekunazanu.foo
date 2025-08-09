// i started writing functions trying to be as general as possible
// so that i can use them in modular way, but that was stupid and
// the code is not modular but it's hack-y & not precise instead
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
    [ 5.4722110, -4.6419592,  0.1696371],
    [-1.1252416,  2.2931704, -0.1678952],
    [ 0.0298016, -0.1931807,  1.1636479]];
const MATRIX_SRGB_XYZ = [
    [ 0.4124564,  0.3575761,  0.1804375],
    [ 0.2126729,  0.7151522,  0.0721750],
    [ 0.0193339,  0.1191920,  0.9503041]];
const MATRIX_TEMP_SRGB = [
    [16.302, -14.322, -0.531],
    [-1.582,   3.516, -0.055],
    [ 0.032,  -0.077,  1.031]];

const arraySPDSaturated = new Array(126).fill(1);

const arraySPDGrey = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
const arraySPDPink = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
let arraySPDOlive = [0.000, 0.000, 0.000, 0.000, 0.000, 0.001, 0.003, 0.006, 0.010, 0.015, 0.020, 0.026, 0.032, 0.040, 0.045, 0.055, 0.063, 0.071, 0.077, 0.089, 0.100, 0.110, 0.122, 0.134, 0.148, 0.164, 0.182, 0.200, 0.217, 0.239, 0.259, 0.281, 0.305, 0.330, 0.356, 0.382, 0.410, 0.439, 0.468, 0.498, 0.528, 0.559, 0.590, 0.621, 0.653, 0.683, 0.713, 0.744, 0.773, 0.801, 0.827, 0.853, 0.876, 0.899, 0.919, 0.938, 0.953, 0.967, 0.979, 0.988, 0.995, 0.998, 1.000, 0.998, 0.995, 0.988, 0.979, 0.967, 0.953, 0.938, 0.919, 0.899, 0.876, 0.853, 0.827, 0.801, 0.773, 0.744, 0.713, 0.683, 0.653, 0.621, 0.590, 0.559, 0.528, 0.498, 0.468, 0.439, 0.410, 0.382, 0.356, 0.330, 0.305, 0.281, 0.259, 0.239, 0.217, 0.200, 0.182, 0.164, 0.148, 0.134, 0.122, 0.110, 0.100, 0.089, 0.077, 0.071, 0.063, 0.055, 0.045, 0.040, 0.032, 0.026, 0.020, 0.015, 0.010, 0.006, 0.003, 0.001, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000];
const arraySPDPurple = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
const arraySPDSun = [0.57, 0.589, 0.609, 0.627, 0.646, 0.664, 0.681, 0.698, 0.714, 0.73, 0.746, 0.76, 0.775, 0.789, 0.802, 0.814, 0.826, 0.838, 0.849, 0.859, 0.869, 0.879, 0.887, 0.896, 0.904, 0.911, 0.918, 0.924, 0.93, 0.935, 0.94, 0.944, 0.948, 0.952, 0.955, 0.958, 0.96, 0.962, 0.964, 0.965, 0.966, 0.967, 0.967, 0.967, 0.967, 0.966, 0.965, 0.964, 0.963, 0.961, 0.959, 0.957, 0.955, 0.952, 0.949, 0.946, 0.943, 0.94, 0.936, 0.933, 0.929, 0.925, 0.921, 0.917, 0.912, 0.908, 0.903, 0.899, 0.894, 0.889, 0.884, 0.879, 0.874, 0.869, 0.864, 0.858, 0.853, 0.848, 0.842, 0.837, 0.831, 0.826, 0.82, 0.814, 0.809, 0.803, 0.797, 0.792, 0.786, 0.78, 0.774, 0.769, 0.763, 0.757, 0.751, 0.746, 0.74, 0.734, 0.728, 0.723, 0.717, 0.711, 0.705, 0.7, 0.694, 0.688, 0.683, 0.677, 0.672, 0.666, 0.661, 0.655, 0.65, 0.644, 0.639, 0.633, 0.628, 0.623, 0.617, 0.612, 0.607, 0.602, 0.597, 0.591, 0.586, 0.581];
const arraySPDD65 = [0.413, 0.431, 0.443, 0.455, 0.487, 0.558, 0.606, 0.677, 0.716, 0.738, 0.761, 0.775, 0.78, 0.785, 0.79, 0.78, 0.769, 0.752, 0.735, 0.781, 0.827, 0.858, 0.899, 0.93, 0.961, 0.992, 0.993, 0.995, 0.997, 0.996, 0.988, 0.983, 0.976, 0.975, 0.978, 0.981, 0.982, 0.964, 0.946, 0.928, 0.923, 0.924, 0.925, 0.927, 0.923, 0.92, 0.916, 0.911, 0.903, 0.896, 0.888, 0.893, 0.9, 0.908, 0.91, 0.901, 0.896, 0.888, 0.884, 0.883, 0.882, 0.882, 0.871, 0.861, 0.851, 0.841, 0.835, 0.826, 0.816, 0.815, 0.814, 0.813, 0.806, 0.788, 0.77, 0.752, 0.754, 0.757, 0.761, 0.762, 0.761, 0.761, 0.76, 0.756, 0.751, 0.748, 0.743, 0.732, 0.721, 0.71, 0.706, 0.707, 0.708, 0.709, 0.7, 0.691, 0.684, 0.678, 0.679, 0.679, 0.68, 0.683, 0.689, 0.694, 0.694, 0.684, 0.677, 0.667, 0.649, 0.627, 0.605, 0.591, 0.596, 0.6, 0.605, 0.612, 0.616, 0.623, 0.63, 0.598, 0.565, 0.544, 0.529, 0.55, 0.571, 0.592];
const arraySPDILLA = [0.044, 0.047, 0.050, 0.053, 0.056, 0.059, 0.062, 0.066, 0.069, 0.073, 0.077, 0.081, 0.085, 0.089, 0.094, 0.098, 0.103, 0.107, 0.112, 0.117, 0.122, 0.128, 0.133, 0.139, 0.144, 0.150, 0.156, 0.162, 0.168, 0.174, 0.180, 0.187, 0.193, 0.200, 0.207, 0.214, 0.221, 0.228, 0.235, 0.242, 0.250, 0.257, 0.265, 0.273, 0.280, 0.288, 0.296, 0.304, 0.313, 0.321, 0.329, 0.337, 0.346, 0.354, 0.363, 0.371, 0.380, 0.389, 0.398, 0.407, 0.415, 0.424, 0.433, 0.442, 0.451, 0.461, 0.470, 0.479, 0.488, 0.497, 0.506, 0.516, 0.525, 0.534, 0.544, 0.553, 0.562, 0.571, 0.581, 0.590, 0.599, 0.609, 0.618, 0.627, 0.636, 0.646, 0.655, 0.664, 0.673, 0.683, 0.692, 0.701, 0.710, 0.719, 0.728, 0.737, 0.746, 0.755, 0.764, 0.772, 0.781, 0.790, 0.799, 0.807, 0.816, 0.824, 0.833, 0.841, 0.850, 0.858, 0.866, 0.874, 0.882, 0.890, 0.898, 0.906, 0.914, 0.922, 0.930, 0.937, 0.945, 0.953, 0.960, 0.967, 0.975, 0.982];

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
const XYILLSPDS = [arraySPDILLA, arraySPDD65, arraySPDSaturated];

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
const COLSPACENAMES = ["sRGB", "DCI-P3", "CIE-RGB", "Adobe RGB", "BT.2100"];
const XYILLSPDNAMES = ["A (Incandescent)", "D65 (Noon Daylight)", "E (Equal Energy Illuminant)"];

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
const arrayPhotonSpectrumWavelengths = ["1km", "1cm", "10µm", "500nm", "10nm", "0.1nm"];
const arrayPhotonSpectrumNames = ["Radio", "Microwave", "Infrared", "Visible", "Ultraviolet", "X-ray"];
initializeCanvasText(canvasPhotonSpectrum);
for (let i = 0; i < 6; i++) {
    drawPhoton(canvasPhotonSpectrum, i * 0.05 + 0.1, i * 210 + 21, 110, 175);
    canvasPhotonSpectrum.fillText(arrayPhotonSpectrumWavelengths[i], i * 210 + 115, 225);
    canvasPhotonSpectrum.fillText(arrayPhotonSpectrumNames[i], i * 210 + 115, 265);
}


const canvasPhotonPower = initializeCanvas("canvasPhotonPower", 300);
const canvasPhotonPowerSPD = initializeCanvas("canvasPhotonPowerSPD", 300);
const sliderPhotonPowerWavelength = [];
const arrayPhotonPowerNumber = new Array(126).fill(0);
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
const arraySimpleSPD = new Array(126).fill(0);
let varSimplePrevWavelength = 0;
initializeSliders(sliderSimpleWavelength, 0, 125, 1, 18);
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
const arraySimpleColorSPD = new Array(126).fill(0);
let arraySimpleColorRSP = [0, 0, 0];
let varSimpleColorPrevWavelength = 0;
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
const arrayRodsLightSPD = new Array(126).fill(0);
let arrayRodsLightRSP = [0, 0, 0];
let varRodsLightPrevWavelength = 0;
initializeSliders(sliderRodsLightWavelength, 0, 125, 1, 18);
sliderRodsLightWavelength.addEventListener("input", updateRodsLight);
drawSSC(canvasRodsLightSSC, [COLORR].concat(LMSCOLORS), [RODMEANS].concat(LMSMEANS), [RODDEVNS].concat(LMSDEVNS), [1, 0.15, 0.15, 0.15]);
drawLabels(canvasRodsLightSSC, ["Rods"], [[500, 55]]);
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
const arrayRodsDarkSPD = new Array(126).fill(0);
const arrayRodsDarkROD = [0, 0, 0];
let arrayRodsDarkRSP = [0, 0, 0, 0];
let varRodsDarkPrevWavelength = 0;
initializeSliders(sliderRodsDarkWavelength, 0, 125, 1, 18);
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
const linkBlindOverlap = document.getElementById("linkBlindOverlap");
const arrayBlindSPD = new Array(126).fill(0);
let arrayBlindRSP = [0, 0, 0];
let varBlindPrevWavelength = 0;
initializeSliders(sliderBlindWavelength, 0, 125, 1, 18);
initializeSliders(sliderBlindSensitivityOverlap, LMSMEANS[1], LMSMEANS[0], 0.1, LMSMEANS[0]);
sliderBlindWavelength.addEventListener("input", updateBlind);
sliderBlindSensitivityOverlap.addEventListener("input", updateBlindSensitivity);
linkBlindOverlap.addEventListener("click", () => { sliderBlindSensitivityOverlap.value = LMSMEANS[1]; updateBlindSensitivity(); });
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


const canvasAggregateSSC = initializeCanvas("canvasAggregateSSC", 300);
const GRAYS = ["#aaa", "#aaa", "#aaa"];
drawSSC(canvasAggregateSSC, GRAYS, [72, 64, 36], [33, 35, 20], [0.96, 1, 0.96]);
drawSSC(canvasAggregateSSC, GRAYS, [71, 62, 38], [34, 38, 19], [0.95, 0.93, 0.98]);
drawSSC(canvasAggregateSSC, GRAYS, [70, 63, 37], [32, 34, 20], [1.03, 0.95, 1.03]);
drawSSC(canvasAggregateSSC, GRAYS, [69, 63, 37], [34, 37, 19], [1, 0.98, 0.98]);
canvasAggregateSSC.clearRect(0, 250, WIDTH, 50)
drawSSC(canvasAggregateSSC);


const canvasMonochromaticSPD = initializeCanvas("canvasMonochromaticSPD", 300);
const canvasNonMonochromaticSPD = initializeCanvas("canvasNonMonochromaticSPD", 300);
const arrayMonochromaticSPD = new Array(126).fill(0); arrayMonochromaticSPD[38] = 1;
drawSPD(canvasMonochromaticSPD, arrayMonochromaticSPD);
drawSPD(canvasNonMonochromaticSPD, arraySPDSun);


const canvasPointWiseSPD = initializeCanvas("canvasPointWiseSPD", 300);
const canvasPointWiseSSC = initializeCanvas("canvasPointWiseSSC", 300);
const canvasPointWiseRSP = initializeCanvas("canvasPointWiseRSP", 200);
drawSSC(canvasPointWiseSSC);
drawSPD(canvasPointWiseSPD, arraySPDPurple);
drawRSP(canvasPointWiseRSP, arraySPDPurple);


const canvasSensitivityUndefinedSPD = initializeCanvas("canvasSensitivityUndefinedSPD", 300);
const canvasSensitivityUndefinedSSC = initializeCanvas("canvasSensitivityUndefinedSSC", 300);
const canvasSensitivityUndefinedRSP = initializeCanvas("canvasSensitivityUndefinedRSP", 200);
const arraySensitivityUndefined = new Array(126).fill(0); arraySensitivityUndefined[124] = "NaN";
drawSPD(canvasSensitivityUndefinedSPD, arraySPDPurple);
drawRSP(canvasSensitivityUndefinedRSP, arraySensitivityUndefined);
drawWavelengthAxes(canvasSensitivityUndefinedSSC);
drawLabels(canvasSensitivityUndefinedSSC, ["Undefined"], [[641, 135]]);


const canvasNonSpectralSPD = initializeCanvas("canvasNonSpectralSPD", 300);
const canvasNonSpectralSSC = initializeCanvas("canvasNonSpectralSSC", 300);
const canvasNonSpectralRSP = initializeCanvas("canvasNonSpectralRSP", 200);
const divNonSpectral = document.getElementById("divNonSpectral");
const linkNonSpectralSPDGrey = document.getElementById("linkNonSpectralSPDGrey");
const linkNonSpectralSPDWhite = document.getElementById("linkNonSpectralSPDWhite");
const linkNonSpectralSPDOlive = document.getElementById("linkNonSpectralSPDOlive");
const linkNonSpectralSPDPink = document.getElementById("linkNonSpectralSPDPink");
const linkNonSpectralSPDPurple = document.getElementById("linkNonSpectralSPDPurple");
let arrayNonSpectralSPD = new Array(126).fill(0);
let arrayNonSpectralRSP = [0, 0, 0];
let varNonSpectralMousedown = false;
drawSSC(canvasNonSpectralSSC);
linkNonSpectralSPDGrey.addEventListener("click", () => { arrayNonSpectralSPD = [...arraySPDGrey]; updateNonSpectral(); });
linkNonSpectralSPDWhite.addEventListener("click", () => { arrayNonSpectralSPD = [...arraySPDSaturated]; updateNonSpectral(); });
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
for (let i = 82; i < 112; i++) arrayMetamerSPDX[i] = 0.7;
arrayMetamerSPDA[90] = 0.48; arrayMetamerSPDA[100] = 0.55;
arrayMetamerSPDB[80] = 0.36; arrayMetamerSPDB[109] = 0.96;
let arrayMetamerSPD = [...arrayMetamerSPDX];
let arrayMetamerRSP = [0, 0, 0];
let varMetamerMousedown = false;
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
const arrayColorMatchingSPD = new Array(126).fill(0);
let arrayColorMatchingRSP = [0, 0, 0];
let varColorMatchingPrevWavelength = 0;
initializeSliders(sliderColorMatchingWavelength, 0, 125, 1, 18);
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
const linkColorMatchCircle = document.getElementById("linkColorMatchCircle");
let varColorMatchingCircleR = sliderColorMatchCircleIntensity.value;
initializeSliders(sliderColorMatchCircleIntensity, -1, 1, 0.05, 0.85);
sliderColorMatchCircleIntensity.addEventListener("input", updateColorMatchCircle);
linkColorMatchCircle.addEventListener("click", () => { sliderColorMatchCircleIntensity.value = -0.80; updateColorMatchCircle(); });
canvasColorMatchCircle.globalCompositeOperation = "lighter";
function updateColorMatchCircle() {
    varColorMatchingCircleR = sliderColorMatchCircleIntensity.value;
    canvasColorMatchCircle.clearRect(0, 0, WIDTH, 300);
    canvasColorMatchCircle.fillStyle = "#000";
    canvasColorMatchCircle.fillRect(0, 0, WIDTH, 300);
    drawCircles(canvasColorMatchCircle, 300, 150, "rgb(80, 50, 200)");
    drawCircles(canvasColorMatchCircle, 340, 150, "rgb(100, 180, 0)");
    drawCircles(canvasColorMatchCircle, 980, 150, "rgb(0, 230, 200)");
    if (varColorMatchingCircleR < 0)
        drawCircles(canvasColorMatchCircle, 940, 150, `rgb(${varColorMatchingCircleR * -225}, 0, 0)`);
    else
        drawCircles(canvasColorMatchCircle, 320, 150, `rgb(${varColorMatchingCircleR * 225}, 0, 0)`);
    spanColorMatchingCircleR.innerHTML = (varColorMatchingCircleR * 1).toFixed(2);
}
updateColorMatchCircle();


const canvasColorSpaceLMS = initializeCanvas("canvasColorSpaceLMS", 600);
const divColorSpaceLMS = document.getElementById("divColorSpaceLMS");
const sliderColorSpaceLMSL = document.getElementById("sliderColorSpaceLMSL");
const sliderColorSpaceLMSM = document.getElementById("sliderColorSpaceLMSM");
const sliderColorSpaceLMSS = document.getElementById("sliderColorSpaceLMSS");
const linkColorSpaceLMSImp = document.getElementById("linkColorSpaceLMSImp");
let arrayColorSpaceLMSRSP = [0, 0, 0];
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
let arrayColorSpaceRGBRSP = [0, 0, 0];
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
const arrayColorSpaceRGBLocusRSP = [0, 0, 0];
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
const linkColorSpaceTransformMat = document.getElementById("linkColorSpaceTransformMatRandom");
const arrayColorSpaceTransformBasis = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
const arrayColorSpaceTransformCMF = new Array(3).fill(0).map(() => new Array(126).fill(0));
const sliderColorSpaceTransform = [];
let arrayColorSpaceTransformMatrix = [[0, 0, 0, 0], [0, 0, 0, 0]];
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        sliderColorSpaceTransform[3 * i + j] = document.getElementById(`sliderColorSpaceTransform${i * 3 + j}`);
        initializeSliders(sliderColorSpaceTransform[i * 3 + j], -1, 2, 0.01, IDENTITY[i][j]);
        sliderColorSpaceTransform[3 * i + j].addEventListener("input", updateColorSpaceTransform);
    }
}
linkColorSpaceTransformMatRandom.addEventListener("click", () => {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            sliderColorSpaceTransform[3 * i + j].value = Math.random();
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


const canvasColorSpaceTransformSpecificCMF = initializeCanvas("canvasColorSpaceTransformSpecificCMF", 330);
const canvasColorSpaceTransformSpecific = initializeCanvas("canvasColorSpaceTransformSpecific", 600);
const linkColorSpaceTransformSpecificMat = document.getElementById("linkColorSpaceTransformSpecificMat");
const arrayColorSpaceTransformSpecificBasis = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
const arrayColorSpaceTransformSpecificCMF = new Array(3).fill(0).map(() => new Array(126).fill(0));
const sliderColorSpaceTransformSpecific = [];
let arrayColorSpaceTransformSpecificMatrix = [[0, 0, 0, 0], [0, 0, 0, 0]];
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        sliderColorSpaceTransformSpecific[3 * i + j] = document.getElementById(`sliderColorSpaceTransformSpecific${i * 3 + j}`);
        initializeSliders(sliderColorSpaceTransformSpecific[i * 3 + j], -1, 2, 0.01, MATRIX_RGB_XYZ[i][j]);
        sliderColorSpaceTransformSpecific[3 * i + j].addEventListener("input", updateColorSpaceTransformSpecific);
    }
}
linkColorSpaceTransformSpecificMat.addEventListener("click", () => {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            sliderColorSpaceTransformSpecific[3 * i + j].value = MATRIX_RGB_XYZ[i][j];
    updateColorSpaceTransformSpecific(); });
function updateColorSpaceTransformSpecific() {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            arrayColorSpaceTransformSpecificBasis[i][j] = sliderColorSpaceTransformSpecific[i * 3 + j].value;
    arrayColorSpaceTransformSpecificMatrix = matrixMultiply(TRANSFMAT, arrayColorSpaceTransformSpecificBasis);
    getCMFTransform(arrayColorSpaceTransformSpecificBasis, arrayColorSpaceTransformSpecificCMF);
    canvasColorSpaceTransformSpecific.clearRect(0, 0, WIDTH, 600);
    canvasColorSpaceTransformSpecificCMF.clearRect(0, 0, WIDTH, 330);
    drawCMF(canvasColorSpaceTransformSpecificCMF, 0, arrayColorSpaceTransformSpecificCMF);
    drawSpaceAxes(canvasColorSpaceTransformSpecific);
    drawSpaceAxes(canvasColorSpaceTransformSpecific, TRANSFMAT, [[-1, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1]]);
    drawSpaceCube(canvasColorSpaceTransformSpecific);
    drawSpaceCube(canvasColorSpaceTransformSpecific, arrayColorSpaceTransformSpecificMatrix, CUBEPOINTS, true);
    drawSpaceLocus(canvasColorSpaceTransformSpecific, arrayCOLMATRGB, arrayColorSpaceTransformSpecificMatrix);
    drawSpaceLabels(canvasColorSpaceTransformSpecific, RGBPM, arrayColorSpaceTransformSpecificMatrix);
    drawSpaceMatrix(canvasColorSpaceTransformSpecific, arrayColorSpaceTransformSpecificBasis);
}
updateColorSpaceTransformSpecific();


const canvasColorSpaceXYZLocus = initializeCanvas("canvasColorSpaceXYZLocus", 600);
const canvasColorSpaceXYZLocusCMF = initializeCanvas("canvasColorSpaceXYZLocusCMF", 330);
const sliderColorSpaceXYZLocusWavelength = document.getElementById("sliderColorSpaceXYZLocusWavelength");
const arrayColorSpaceXYZLocusRSP = [0, 0, 0];
let arrayColorSpaceXYZTransform = [[...MATRIX_RGB_XYZ[0], 0], [...MATRIX_RGB_XYZ[1], 0], [...MATRIX_RGB_XYZ[2], 0], [0, 0, 0, 1]];
arrayColorSpaceXYZTransform = matrixMultiply(TRANSFMAT, arrayColorSpaceXYZTransform);
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
    drawSpaceCube(canvasColorSpaceXYZLocus, arrayColorSpaceXYZTransform, CUBEPOINTS, true);
    drawSpaceLabels(canvasColorSpaceXYZLocus, RGBPM, arrayColorSpaceXYZTransform, CUBELABELOFF, CUBELABELPOS, "#aaa");
    drawSpaceLocus(canvasColorSpaceXYZLocus, arrayCOLMATXYZ);
    drawSpacePointLines(canvasColorSpaceXYZLocus, arrayColorSpaceXYZLocusRSP)
    drawSpacePoint(canvasColorSpaceXYZLocus, arrayColorSpaceXYZLocusRSP);
    drawSpaceLabels(canvasColorSpaceXYZLocus, XYZPM);
}
updateColorSpaceXYZLocus();


const canvasColorSpaceXYZ = initializeCanvas("canvasColorSpaceXYZ", 600);
const sliderColorSpaceXYZX = document.getElementById("sliderColorSpaceXYZX");
const sliderColorSpaceXYZY = document.getElementById("sliderColorSpaceXYZY");
const sliderColorSpaceXYZZ = document.getElementById("sliderColorSpaceXYZZ");
const linkColorSpaceXYZCyan = document.getElementById("linkColorSpaceXYZCyan");
let arrayColorSpaceXYZRSP = [0, 0, 0];
initializeSliders(sliderColorSpaceXYZX, 0, 1, 0.025, 0.4);
initializeSliders(sliderColorSpaceXYZY, 0, 1, 0.025, 0.5);
initializeSliders(sliderColorSpaceXYZZ, 0, 1, 0.025, 0.5);
sliderColorSpaceXYZX.addEventListener("input", updateColorSpaceXYZ);
sliderColorSpaceXYZY.addEventListener("input", updateColorSpaceXYZ);
sliderColorSpaceXYZZ.addEventListener("input", updateColorSpaceXYZ);
linkColorSpaceXYZCyan.addEventListener("click", () => {
    sliderColorSpaceXYZX.value = 0.001;
    sliderColorSpaceXYZY.value = 0.206;
    sliderColorSpaceXYZZ.value = 0.130;
    updateColorSpaceXYZ();
});
function updateColorSpaceXYZ() {
    canvasColorSpaceXYZ.clearRect(0, 0, WIDTH, 600);
    arrayColorSpaceXYZRSP = [sliderColorSpaceXYZX.value, sliderColorSpaceXYZY.value, sliderColorSpaceXYZZ.value];
    drawSpaceAxes(canvasColorSpaceXYZ);
    drawSpacePlane(canvasColorSpaceXYZ, arrayColorSpaceXYZRSP, RGBtoXYZClip);
    drawSpaceCube(canvasColorSpaceXYZ, arrayColorSpaceXYZTransform, CUBEPOINTS, true);
    drawSpaceCube(canvasColorSpaceXYZ);
    drawSpaceLocus(canvasColorSpaceXYZ, arrayCOLMATXYZ);
    drawSpaceLabels(canvasColorSpaceXYZ, XYZPM);
    drawSpacePoint(canvasColorSpaceXYZ, arrayColorSpaceXYZRSP);
}
updateColorSpaceXYZ();


const canvasColorSpaceRGBChroma = initializeCanvas("canvasColorSpaceRGBChroma", 600);
const divColorSpaceRGBChroma = document.getElementById("divColorSpaceRGBChroma");
const sliderColorSpaceRGBChroma = [];
const progressColorSpaceRGBChroma = [];
let arrayColorSpaceRGBChromaRSP = [0, 0, 0];
for (let i = 0; i < 3; i++) {
    sliderColorSpaceRGBChroma[i] = document.getElementById(`sliderColorSpaceRGBChroma${i}`);
    progressColorSpaceRGBChroma[i] = document.getElementById(`progressColorSpaceRGBChroma${i}`);
    initializeSliders(sliderColorSpaceRGBChroma[i], 0.01, 0.98, 0.01, 0.33);
    initializeProgressBar(progressColorSpaceRGBChroma[i], 0.98, 0.33);
    sliderColorSpaceRGBChroma[i].addEventListener("input", () => { normalizeSliders(sliderColorSpaceRGBChroma, i); updateColorSpaceRGBChroma();});
}
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


const canvasColorSpaceRGBChromaProject = initializeCanvas("canvasColorSpaceRGBChromaProject", 600);
const divColorSpaceRGBChromaProject = document.getElementById("divColorSpaceRGBChromaProject");
const linkColorSpaceRGBChromaProjectPan = document.getElementById("linkColorSpaceRGBChromaProjectPan");
const arrayColorSpaceRGBChromaProjectGreens = [[0.15, 0.45, 0.15], [0.2, 0.6, 0.2], [0.3, 0.9, 0.3]];
const arrayColorSpaceRGBChromaProjectNorms = [0, 0, 0];
const arrayColorSpaceRGBChromaProjectTransMat =  TRANSFMAT.map(row => row.slice());
const sliderColorSpaceRGBChromaProject = [];
const progressColorSpaceRGBChromaProject = [];
const linkColorSpaceRGBChromaProjectGreens = [];
let arrayColorSpaceRGBChromaProjectRSP = [0, 0, 0];
let varColorSpaceRGBChromaProjectSum = 0;
for (let i = 0; i < 3; i++) {
    linkColorSpaceRGBChromaProjectGreens[i] = document.getElementById(`linkColorSpaceRGBChromaProjectGreen${i}`);
    sliderColorSpaceRGBChromaProject[i] = document.getElementById(`sliderColorSpaceRGBChromaProject${i}`);
    progressColorSpaceRGBChromaProject[i] = document.getElementById(`progressColorSpaceRGBChromaProject${i}`);
    initializeSliders(sliderColorSpaceRGBChromaProject[i], 0.01, 0.98, 0.01, 0.33);
    initializeProgressBar(progressColorSpaceRGBChromaProject[i], 0.98, 0.33);
    sliderColorSpaceRGBChromaProject[i].addEventListener("input", updateColorSpaceRGBChromaProject);
    linkColorSpaceRGBChromaProjectGreens[i].addEventListener("click", () => {
        sliderColorSpaceRGBChromaProject.forEach((slider, index) => slider.value = arrayColorSpaceRGBChromaProjectGreens[i][index]);
        updateColorSpaceRGBChromaProject(); });
}
sliderColorSpaceRGBChromaProjectPan = document.getElementById("sliderColorSpaceRGBChromaProjectPan");
initializeSliders(sliderColorSpaceRGBChromaProjectPan, -120, 180, 1, -120);
linkColorSpaceRGBChromaProjectPan.addEventListener("click", () => {
    sliderColorSpaceRGBChromaProjectPan.value = 180;
    changeTransformation(arrayColorSpaceRGBChromaProjectTransMat, sliderColorSpaceRGBChromaProjectPan.value, sliderColorSpaceRGBChromaProjectPan.min);
    updateColorSpaceRGBChromaProject(); });
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
    drawSpacePoint(canvasColorSpaceRGBChromaProject, arrayColorSpaceRGBChromaProjectRSP, arrayColorSpaceRGBChromaProjectTransMat, "#aaa");
    drawSpacePoint(canvasColorSpaceRGBChromaProject, arrayColorSpaceRGBChromaProjectNorms, arrayColorSpaceRGBChromaProjectTransMat);
    drawSpaceLabels(canvasColorSpaceRGBChromaProject, RGBPM, arrayColorSpaceRGBChromaProjectTransMat);
    colorBoxRGB(divColorSpaceRGBChromaProject, arrayColorSpaceRGBChromaProjectRSP);
}
changeTransformation(arrayColorSpaceRGBChromaProjectTransMat, sliderColorSpaceRGBChromaProjectPan.value, sliderColorSpaceRGBChromaProjectPan.min);
updateColorSpaceRGBChromaProject();

const canvasChromaSpaceRG = initializeCanvas("canvasChromaSpaceRG", 600);
const sliderChromaSpaceRGPan = document.getElementById("sliderChromaSpaceRGPan");
const linkChromaSpaceRGPan = document.getElementById("linkChromaSpaceRGPan");
const arrayChromaSpaceRGBasisMat = [[410, 0, -120, BASEXOFF], [0, -400, 80, BASEYOFF]];
const arrayChromaSpaceRGTransMat = arrayChromaSpaceRGBasisMat.map(row => row.slice());
initializeSliders(sliderChromaSpaceRGPan, -120, 0, 0.5, -120);
sliderChromaSpaceRGPan.addEventListener("input", () => {
    changeTransformation(arrayChromaSpaceRGTransMat, sliderChromaSpaceRGPan.value, sliderChromaSpaceRGPan.min, 1, -0.66, -0.1, arrayChromaSpaceRGBasisMat);
    updateChromaSpaceRG(); });
linkChromaSpaceRGPan.addEventListener("click", () => {
    sliderChromaSpaceRGPan.value = 0;
    changeTransformation(arrayChromaSpaceRGTransMat, sliderChromaSpaceRGPan.value, sliderChromaSpaceRGPan.min, 1, -0.66, -0.1, arrayChromaSpaceRGBasisMat);
    updateChromaSpaceRG(); });
function updateChromaSpaceRG() {
    canvasChromaSpaceRG.clearRect(0, 0, WIDTH, 600);
    drawSpaceAxes(canvasChromaSpaceRG, arrayChromaSpaceRGTransMat);
    drawSpaceSlice(canvasChromaSpaceRG, 1, arrayChromaSpaceRGTransMat);
    drawSpaceCube(canvasChromaSpaceRG, arrayChromaSpaceRGTransMat);
    drawSpaceLabels(canvasChromaSpaceRG, RGBPM, arrayChromaSpaceRGTransMat);
}
updateChromaSpaceRG();

const canvasChromaRGBLocus = initializeCanvas("canvasChromaRGBLocus", 600);
const sliderChromaRGBLocusWavelength = document.getElementById("sliderChromaRGBLocusWavelength");
const sliderChromaRGBLocusPan = document.getElementById("sliderChromaRGBLocusPan");
const linkChromaRGBLocusPan = document.getElementById("linkChromaRGBLocusPan");
const switchChromaRGBLocusSlice = document.getElementById("switchChromaRGBLocusSlice");
const arrayChromaRGBLocusBasisMat = [[205, 0, -60, BASEXOFF + 350], [0, -200, 40, BASEYOFF + 20]];
const arrayChromaRGBLocusRSP = [0, 0, 0];
const arrayChromaRGBLocusNorms = [0, 0, 0];
const arrayChromaRGBLocusTransMat = arrayChromaRGBLocusBasisMat.map(row => row.slice());
let varChromaRGBLocusSum = 0;
initializeSliders(sliderChromaRGBLocusWavelength, 0, 125, 1, 10);
initializeSliders(sliderChromaRGBLocusPan, -120, 0, 0.5, -120);
sliderChromaRGBLocusWavelength.addEventListener("input", updateChromaRGBLocus);
sliderChromaRGBLocusPan.addEventListener("input", () => {
    changeTransformation(arrayChromaRGBLocusTransMat, sliderChromaRGBLocusPan.value, sliderChromaRGBLocusPan.min, 0.5, -0.33, -0.05, arrayChromaRGBLocusBasisMat);
    updateChromaRGBLocus(); });
linkChromaRGBLocusPan.addEventListener("click", () => {
    sliderChromaRGBLocusPan.value = 0;
    changeTransformation(arrayChromaRGBLocusTransMat, sliderChromaRGBLocusPan.value, sliderChromaRGBLocusPan.min, 0.5, -0.33, -0.05, arrayChromaRGBLocusBasisMat);
    updateChromaRGBLocus(); });
switchChromaRGBLocusSlice.addEventListener("click", () => {
    updateChromaRGBLocus(); });
function updateChromaRGBLocus() {
    canvasChromaRGBLocus.clearRect(0, 0, WIDTH, 600);
    varChromaRGBLocusSum = 0;
    getCMFValues(sliderChromaRGBLocusWavelength.value, arrayChromaRGBLocusRSP);
    arrayChromaRGBLocusRSP.forEach((val, i) => varChromaRGBLocusSum += Number(val));
    getCMFValues(sliderChromaRGBLocusWavelength.value, arrayChromaRGBLocusNorms, arrayCHRMATRGB);
    if (switchChromaRGBLocusSlice.checked) drawSpaceSlice(canvasChromaRGBLocus, 1, arrayChromaRGBLocusTransMat, 2.1);
    drawSpaceAxes(canvasChromaRGBLocus, arrayChromaRGBLocusTransMat);
    drawSpaceLocus(canvasChromaRGBLocus, arrayCOLMATRGB, arrayChromaRGBLocusTransMat, "#aaa");
    drawSpaceTriangle(canvasChromaRGBLocus, 1, arrayChromaRGBLocusTransMat);
    drawSpaceCube(canvasChromaRGBLocus, arrayChromaRGBLocusTransMat);
    drawSpaceLocus(canvasChromaRGBLocus, arrayCHRMATRGB, arrayChromaRGBLocusTransMat);
    drawSpaceLine(canvasChromaRGBLocus, arrayChromaRGBLocusNorms, arrayChromaRGBLocusRSP, arrayChromaRGBLocusTransMat);
    drawSpaceLine(canvasChromaRGBLocus, arrayChromaRGBLocusNorms, [0, 0, 0], arrayChromaRGBLocusTransMat);
    drawSpacePoint(canvasChromaRGBLocus, arrayChromaRGBLocusNorms, arrayChromaRGBLocusTransMat);
    drawSpacePoint(canvasChromaRGBLocus, arrayChromaRGBLocusRSP, arrayChromaRGBLocusTransMat, "#aaa");
    drawSpaceLabels(canvasChromaRGBLocus, RGBPM, arrayChromaRGBLocusTransMat);
}
updateChromaRGBLocus();


const canvasChromaRGUndefined = initializeCanvas("canvasChromaRGUndefined", 600);
const PROJRGBBASEMAT = [[205, 0, -60, BASEXOFF + 350], [0, -200, 40, BASEYOFF + 20]];
const PROJRGBMAT = PROJRGBBASEMAT.map(row => row.slice());
changeTransformation(PROJRGBMAT, 0, -120, 0.5, -0.33, -0.05, PROJRGBBASEMAT);
function updateChromaRGUndefined() {
    canvasChromaRGUndefined.clearRect(0, 0, WIDTH, 600);
    for (let i = 0; i < 75; i++) drawSpaceLine(canvasChromaRGUndefined, [-600 + i * 25, 600], [0 + i * 25, 0], IDENTITY, "#aaa");
    drawSpaceTriangle(canvasChromaRGUndefined, 1, PROJRGBMAT, "#000", 0, "#fff");
    drawSpaceSlice(canvasChromaRGUndefined, 1, PROJRGBMAT, 2.1);
    drawSpaceAxes(canvasChromaRGUndefined, PROJRGBMAT);
    drawSpaceLocus(canvasChromaRGUndefined, arrayCHRMATRGB, PROJRGBMAT);
    drawSpaceLabels(canvasChromaRGUndefined, RGBPM, PROJRGBMAT);
    drawLabels(canvasChromaRGUndefined, ["Undefined chromaticity"], [[285, 250]]);
    drawLabels(canvasChromaRGUndefined, ["(Except for the CIE RGB"], [[285, 290]]);
    drawLabels(canvasChromaRGUndefined, ["and spectral colours)"], [[285, 330]]);
}
updateChromaRGUndefined();


const canvasChromaRGDefined = initializeCanvas("canvasChromaRGDefined", 600);
function updateChromaRGDefined() {
    canvasChromaRGDefined.clearRect(0, 0, WIDTH, 600);
    drawSpaceChromaFill(canvasChromaRGDefined, arrayCHRMATRGB, PROJRGBMAT, "#cff");
    drawSpaceTriangle(canvasChromaRGDefined, 1, PROJRGBMAT, "#000", 0, "#fff");
    drawSpaceSlice(canvasChromaRGDefined, 1, PROJRGBMAT, 2.1);
    drawSpaceAxes(canvasChromaRGDefined, PROJRGBMAT);
    drawSpaceLocus(canvasChromaRGDefined, arrayCHRMATRGB, PROJRGBMAT);
    drawSpaceLabels(canvasChromaRGDefined, RGBPM, PROJRGBMAT);
}
updateChromaRGDefined();


const canvasChromaRGLinear = initializeCanvas("canvasChromaRGLinear", 600);
const spanChromaRGLinearChromaValues = document.getElementById("spanChromaRGLinearChromaValues");
const spanChromaRGLinearChromaResult = document.getElementById("spanChromaRGLinearChromaResult");
const arrayChromaRGLinearWavelengthVals = [35, 52];
const arrayChromaRGLinearIntensities = [0.5, 0.5];
const arrayChromaRGLinearCtrlPoints = [[0, 0, 0], [0, 0, 0]];
const arrayChromaRGLinearCtrlColors = [[0, 0, 0], [0, 0, 0]];
const arrayChromaRGLinearPoint = [0, 0, 0];
const arrayChromaRGLinearColor = [0, 0, 0];
const sliderChromaRGLinearWavelength = [];
const sliderChromaRGLinearIntensity = [];
const spanChromaRGLinearWavelengthR = [];
const spanChromaRGLinearWavelengthG = [];
const spanChromaRGLinearWavelength = [];
const spanChromaRGLinearIntensity = [];
for (let i = 0; i < 2; i++) {
    spanChromaRGLinearWavelengthR[i] = document.getElementById(`spanChromaRGLinearWavelength${i}R`);
    spanChromaRGLinearWavelengthG[i] = document.getElementById(`spanChromaRGLinearWavelength${i}G`);
    spanChromaRGLinearWavelength[i] = document.getElementById(`spanChromaRGLinearWavelength${i}`);
    spanChromaRGLinearIntensity[i] = document.getElementById(`spanChromaRGLinearIntensity${i}`);
    sliderChromaRGLinearWavelength[i] = document.getElementById(`sliderChromaRGLinearWavelength${i}`);
    sliderChromaRGLinearIntensity[i] = document.getElementById(`sliderChromaRGLinearIntensity${i}`);
    initializeSliders(sliderChromaRGLinearWavelength[i], 0, 125, 1, arrayChromaRGLinearWavelengthVals[i]);
    initializeSliders(sliderChromaRGLinearIntensity[i], 0.01, 0.99, 0.01, arrayChromaRGLinearIntensities[i]);
    sliderChromaRGLinearWavelength[i].addEventListener("input", updateChromaRGLinear);
    sliderChromaRGLinearIntensity[i].addEventListener("input", () => { normalizeSliders(sliderChromaRGLinearIntensity, i, 1); updateChromaRGLinear(); });
}
function updateChromaRGLinear() {
    for (let i = 0; i < 2; i++) {
        getCMFValues(sliderChromaRGLinearWavelength[i].value, arrayChromaRGLinearCtrlPoints[i], arrayCHRMATRGB);
        getCMFValues(sliderChromaRGLinearWavelength[i].value, arrayChromaRGLinearCtrlColors[i], arrayCOLMATSRGB);
        arrayChromaRGLinearIntensities[i] = Number(sliderChromaRGLinearIntensity[i].value);
        spanChromaRGLinearWavelengthR[i].innerHTML = arrayChromaRGLinearCtrlPoints[i][0].toFixed(3);
        spanChromaRGLinearWavelengthG[i].innerHTML = arrayChromaRGLinearCtrlPoints[i][1].toFixed(3);
        spanChromaRGLinearIntensity[i].innerHTML = (sliderChromaRGLinearIntensity[i].value * 1).toFixed(2);
        spanChromaRGLinearWavelength[i].innerHTML = (sliderChromaRGLinearWavelength[i].value * 2.8 + 380).toFixed(0);
    }
    spanChromaRGLinearChromaValues.innerHTML = (sliderChromaRGLinearIntensity[0].value * 1).toFixed(2) + " × (" + arrayChromaRGLinearCtrlPoints[0][0].toFixed(2) + "r + " + arrayChromaRGLinearCtrlPoints[0][1].toFixed(2) + "g) + " + (sliderChromaRGLinearIntensity[1].value * 1).toFixed(2) + " × (" + arrayChromaRGLinearCtrlPoints[1][0].toFixed(2) + "r + " + arrayChromaRGLinearCtrlPoints[1][1].toFixed(2) + "g)";
    spanChromaRGLinearChromaResult.innerHTML = (sliderChromaRGLinearIntensity[0].value * arrayChromaRGLinearCtrlPoints[0][0] + sliderChromaRGLinearIntensity[1].value * arrayChromaRGLinearCtrlPoints[1][0]).toFixed(2) + "r + " + (sliderChromaRGLinearIntensity[0].value * arrayChromaRGLinearCtrlPoints[0][1] + sliderChromaRGLinearIntensity[1].value * arrayChromaRGLinearCtrlPoints[1][1]).toFixed(2) + "g";
    canvasChromaRGLinear.clearRect(0, 0, WIDTH, 600);
    drawSpaceSlice(canvasChromaRGLinear, 1, PROJRGBMAT, 2.1);
    drawSpaceAxes(canvasChromaRGLinear, PROJRGBMAT);
    drawSpaceLabels(canvasChromaRGLinear, RGBPM, PROJRGBMAT);
    drawSpaceLocus(canvasChromaRGLinear, arrayCHRMATRGB, PROJRGBMAT);
    drawSpaceLine(canvasChromaRGLinear, arrayChromaRGLinearCtrlPoints[0], arrayChromaRGLinearCtrlPoints[1], PROJRGBMAT);
    drawSpacePoint(canvasChromaRGLinear, arrayChromaRGLinearCtrlPoints[0], PROJRGBMAT, "#000", 6);
    drawSpacePoint(canvasChromaRGLinear, arrayChromaRGLinearCtrlPoints[1], PROJRGBMAT, "#000", 6);
    getChromaticity(arrayChromaRGLinearCtrlPoints, arrayChromaRGLinearIntensities, arrayChromaRGLinearPoint, arrayChromaRGLinearColor);
    drawSpacePoint(canvasChromaRGLinear, arrayChromaRGLinearPoint, PROJRGBMAT);
    colorBoxRGB(divChromaRGLinear, arrayChromaRGLinearColor);
}
updateChromaRGLinear();


const canvasChromaXYZLocus = initializeCanvas("canvasChromaXYZLocus", 600);
const sliderChromaXYZLocusWavelength = document.getElementById("sliderChromaXYZLocusWavelength");
const sliderChromaXYZLocusPan = document.getElementById("sliderChromaXYZLocusPan");
const arrayChromaXYZLocusBasisMat = [[410, 0, -120, BASEXOFF], [0, -400, 80, BASEYOFF]];
const arrayChromaXYZLocusRSP = [0, 0, 0];
const arrayChromaXYZLocusNorms = [0, 0, 0];
const arrayChromaXYZLocusTransMat = arrayChromaXYZLocusBasisMat.map(row => row.slice());
let varChromaXYZLocusSum = 0;
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
    drawSpaceCube(canvasChromaXYZLocus, arrayChromaXYZLocusTransMat);
    drawSpaceLocus(canvasChromaXYZLocus, arrayCHRMATXYZ, arrayChromaXYZLocusTransMat);
    drawSpaceLine(canvasChromaXYZLocus, arrayChromaXYZLocusNorms, arrayChromaXYZLocusRSP, arrayChromaXYZLocusTransMat);
    drawSpaceLine(canvasChromaXYZLocus, arrayChromaXYZLocusNorms, [0, 0, 0], arrayChromaXYZLocusTransMat);
    drawSpacePoint(canvasChromaXYZLocus, arrayChromaXYZLocusNorms, arrayChromaXYZLocusTransMat);
    drawSpacePoint(canvasChromaXYZLocus, arrayChromaXYZLocusRSP, arrayChromaXYZLocusTransMat, "#aaa");
    drawSpaceLabels(canvasChromaXYZLocus, XYZPM, arrayChromaXYZLocusTransMat);
}
updateChromaXYZLocus();


const canvasLocusRatio = initializeCanvas("canvasLocusRatio", 600);
const spanLocusRatiox = document.getElementById("spanLocusRatiox");
const spanLocusRatioy = document.getElementById("spanLocusRatioy");
const arrayLocusRatioWavelengthVals = [40, 82];
const arrayLocusRatioIntensities = [1.56, 1.44];
const arrayLocusRatioCtrlPoints = [[0, 0, 0], [0, 0, 0]];
const arrayLocusRatioPoint = [0, 0, 0];
const arrayLocusRatioColor = [0, 0, 0];
const sliderLocusRatioWavelength = [];
const sliderLocusRatioIntensity = [];
for (let i = 0; i < 2; i++) {
    sliderLocusRatioWavelength[i] = document.getElementById(`sliderLocusRatioWavelength${i}`);
    sliderLocusRatioIntensity[i] = document.getElementById(`sliderLocusRatioIntensity${i}`);
    initializeSliders(sliderLocusRatioWavelength[i], 0, 125, 1, arrayLocusRatioWavelengthVals[i]);
    initializeSliders(sliderLocusRatioIntensity[i], 0.01, 2.99, 0.01, arrayLocusRatioIntensities[i]);
    sliderLocusRatioWavelength[i].addEventListener("input", updateLocusRatio);
    sliderLocusRatioIntensity[i].addEventListener("input", () => { normalizeSliders(sliderLocusRatioIntensity, i, 3); updateLocusRatio(); });
}
function updateLocusRatio() {
    for (let i = 0; i < 2; i++) {
        getCMFValues(sliderLocusRatioWavelength[i].value, arrayLocusRatioCtrlPoints[i], arrayCHRMATXYZ);
        arrayLocusRatioIntensities[i] = Number(sliderLocusRatioIntensity[i].value);
    }
    canvasLocusRatio.clearRect(0, 0, WIDTH, 600);
    drawSpaceChroma(canvasLocusRatio);
    drawSpaceAxes(canvasLocusRatio, PROJMAT);
    drawLabels(canvasLocusRatio, ["x", "y"], [[PROJMAT[0][3] - 30, 31], [PROJMAT[0][0] + 30, PROJMAT[1][3] - 30]]);
    drawSpaceLocus(canvasLocusRatio, arrayCHRMATXYZ, PROJMAT);
    drawSpaceLine(canvasLocusRatio, arrayLocusRatioCtrlPoints[0], arrayLocusRatioCtrlPoints[1], PROJMAT);
    drawSpacePoint(canvasLocusRatio, arrayLocusRatioCtrlPoints[0], PROJMAT, "#000", 6);
    drawSpacePoint(canvasLocusRatio, arrayLocusRatioCtrlPoints[1], PROJMAT, "#000", 6);
    getChromaticity(arrayLocusRatioCtrlPoints, arrayLocusRatioIntensities, arrayLocusRatioPoint, arrayLocusRatioColor);
    drawSpacePoint(canvasLocusRatio, arrayLocusRatioPoint, PROJMAT);
    colorBoxRGB(divLocusRatio, vectorMultiply(MATRIX_XYZ_RGB, arrayLocusRatioColor));
    spanLocusRatiox.innerHTML = "x: " + arrayLocusRatioPoint[0].toFixed(3);
    spanLocusRatioy.innerHTML = "y: " + arrayLocusRatioPoint[1].toFixed(3);
}


const canvasLocusGamutTwo = initializeCanvas("canvasLocusGamutTwo", 600);
const arrayLocusGamutTwoWavelengthVals = [20, 59];
const arrayLocusGamutTwoIntensities = [1, 2];
const arrayLocusGamutTwoCtrlPoints = XYCIERGB.slice(1);
const arrayLocusGamutTwoPoint = [0, 0, 0];
const arrayLocusGamutTwoColor = [0, 0, 0];
const sliderLocusGamutTwoIntensity = [];
for (let i = 0; i < 2; i++) {
    sliderLocusGamutTwoIntensity[i] = document.getElementById(`sliderLocusGamutTwoIntensity${i}`);
    initializeSliders(sliderLocusGamutTwoIntensity[i], 0.01, 2.99, 0.01, arrayLocusGamutTwoIntensities[i]);
    sliderLocusGamutTwoIntensity[i].addEventListener("input", () => { normalizeSliders(sliderLocusGamutTwoIntensity, i, 3); updateLocusGamutTwo(); });
}
function updateLocusGamutTwo() {
    for (let i = 0; i < 2; i++) arrayLocusGamutTwoIntensities[i] = Number(sliderLocusGamutTwoIntensity[i].value);
    canvasLocusGamutTwo.clearRect(0, 0, WIDTH, 600);
    drawSpaceChroma(canvasLocusGamutTwo);
    drawSpaceLocus(canvasLocusGamutTwo, arrayCHRMATXYZ, PROJMAT);
    drawSpaceLine(canvasLocusGamutTwo, arrayLocusGamutTwoCtrlPoints[0], arrayLocusGamutTwoCtrlPoints[1], PROJMAT);
    drawSpacePoint(canvasLocusGamutTwo, arrayLocusGamutTwoCtrlPoints[0], PROJMAT, "#000", 6);
    drawSpacePoint(canvasLocusGamutTwo, arrayLocusGamutTwoCtrlPoints[1], PROJMAT, "#000", 6);
    drawLabels(canvasLocusGamutTwo, WAVXYZLABELS, WAVXYZLABELPOS);
    getChromaticity(arrayLocusGamutTwoCtrlPoints, arrayLocusGamutTwoIntensities, arrayLocusGamutTwoPoint, arrayLocusGamutTwoColor);
    drawSpacePoint(canvasLocusGamutTwo, arrayLocusGamutTwoPoint, PROJMAT);
    colorBoxRGB(divLocusGamutTwo, vectorMultiply(MATRIX_XYZ_RGB, arrayLocusGamutTwoColor));
}


const canvasLocusGamutCIE = initializeCanvas("canvasLocusGamutCIE", 600);
const spanLocusGamutCIEChromaticity = document.getElementById("spanLocusGamutCIEChromaticity");
const arrayLocusGamutCIECtrlPoints = XYCIERGB;
const arrayLocusGamutCIEWhitePoint = [1, 1, 1];
const arrayLocusGamutCIEIntensities = [0, 0];
const arrayLocusGamutCIEPoint = [0, 0, 0];
const arrayLocusGamutCIEColor = [0, 0, 0];
const sliderLocusGamutCIEIntensity = [];
const spanLocusGamutCIEIntensity = [];
for (let i = 0; i < 3; i++) {
    sliderLocusGamutCIEIntensity[i] = document.getElementById(`sliderLocusGamutCIEIntensity${i}`);
    spanLocusGamutCIEIntensity[i] = document.getElementById(`spanLocusGamutCIEIntensity${i}`);
    initializeSliders(sliderLocusGamutCIEIntensity[i], 0.01, 2.99, 0.01, 1);
    sliderLocusGamutCIEIntensity[i].addEventListener("input", () => { normalizeSliders(sliderLocusGamutCIEIntensity, i, 3); updateLocusGamutCIE(); });
}
function updateLocusGamutCIE() {
    for (let i = 0; i < 3; i++) {
        arrayLocusGamutCIEIntensities[i] = sliderLocusGamutCIEIntensity[i].value * arrayLocusGamutCIEWhitePoint[i];
        spanLocusGamutCIEIntensity[i].innerHTML = (sliderLocusGamutCIEIntensity[i].value / 3).toFixed(2);
    }
    canvasLocusGamutCIE.clearRect(0, 0, WIDTH, 600);
    drawSpaceChroma(canvasLocusGamutCIE);
    drawSpaceLocus(canvasLocusGamutCIE, arrayCHRMATXYZ, PROJMAT);
    drawGamut(canvasLocusGamutCIE, arrayLocusGamutCIECtrlPoints, arrayLocusGamutCIEIntensities);
    getChromaticity(arrayLocusGamutCIECtrlPoints, arrayLocusGamutCIEIntensities, arrayLocusGamutCIEPoint, arrayLocusGamutCIEColor);
    drawSpacePoint(canvasLocusGamutCIE, arrayLocusGamutCIEPoint, PROJMAT);
    drawLabels(canvasLocusGamutCIE, WAVXYZLABELS, WAVXYZLABELPOS);
    colorBoxRGB(divLocusGamutCIE, vectorMultiply(MATRIX_XYZ_RGB, arrayLocusGamutCIEColor));
    spanLocusGamutCIEChromaticity.innerHTML = ((sliderLocusGamutCIEIntensity[0].value * 0.733 + sliderLocusGamutCIEIntensity[1].value * 0.266 + sliderLocusGamutCIEIntensity[2].value * 0.166) / 3).toFixed(2) + "r + " + ((sliderLocusGamutCIEIntensity[0].value * 0.267 + sliderLocusGamutCIEIntensity[1].value * 0.724 + sliderLocusGamutCIEIntensity[2].value * 0.008) / 3).toFixed(2) + "g";
}


const canvasLocusGamutMultiple = initializeCanvas("canvasLocusGamutMultiple", 600);
const selectLocusGamutMultipleSpace = document.getElementById("selectLocusGamutMultipleSpace");
let varLocusGamutMultipleCurrentName = [COLSPACENAMES[0]];
let arrayLocusGamutMultipleCtrlPoints = COLSPACES[0];
const arrayLocusGamutMultipleWhitePoint = [0.638, 1.175, 1.186];
const arrayLocusGamutMultipleIntensities = [0, 0, 0];
const arrayLocusGamutMultiplePoint = [0, 0, 0];
const arrayLocusGamutMultipleColor = [0, 0, 0];
const sliderLocusGamutMultipleIntensity = [];
const linkLocusGamutMultiple = [];
for (let i = 0; i < 3; i++) {
    sliderLocusGamutMultipleIntensity[i] = document.getElementById(`sliderLocusGamutMultipleIntensity${i}`);
    initializeSliders(sliderLocusGamutMultipleIntensity[i], 0.01, 2.99, 0.01, 1);
    sliderLocusGamutMultipleIntensity[i].addEventListener("input", () => {
        normalizeSliders(sliderLocusGamutMultipleIntensity, i, 3); updateLocusGamutMultiple(); });
}
COLSPACENAMES.forEach((element, index) => {
    let newOption = document.createElement("option");
    newOption.value = index; newOption.text = element;
    selectLocusGamutMultipleSpace.appendChild(newOption);
});
selectLocusGamutMultipleSpace.value = 0;
selectLocusGamutMultipleSpace.addEventListener("input", () => {
    arrayLocusGamutMultipleCtrlPoints = COLSPACES[selectLocusGamutMultipleSpace.value];
    varLocusGamutMultipleCurrentName = [COLSPACENAMES[selectLocusGamutMultipleSpace.value]];
    getWhitePoint(arrayLocusGamutMultipleCtrlPoints, XYD65, arrayLocusGamutMultipleWhitePoint);
    updateLocusGamutMultiple();
});
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


const canvasHexDeconstruction = initializeCanvas("canvasHexDeconstruction", 250);
drawLabels(canvasHexDeconstruction, ["A49D2F"], [[641, 130]], "#000", "192px JetBrains Mono");
drawLabels(canvasHexDeconstruction, ["#"], [[250, 86]], "#000", "96px JetBrains Mono");
drawLabels(canvasHexDeconstruction, ["10100100"], [[406, 221]], "#a00", "36px JetBrains Mono");
drawLabels(canvasHexDeconstruction, ["10011101"], [[641, 221]], "#080", "36px JetBrains Mono");
drawLabels(canvasHexDeconstruction, ["00101111"], [[876, 221]], "#00e", "36px JetBrains Mono");


const canvasBlackbodyColorSPD = initializeCanvas("canvasBlackbodyColorSPD", 300);
const canvasBlackbodyColorSSC = initializeCanvas("canvasBlackbodyColorSSC", 300);
const canvasBlackbodyColorRSP = initializeCanvas("canvasBlackbodyColorRSP", 200);
const canvasLocusPlanckian = initializeCanvas("canvasLocusPlanckian", 600);
const sliderBlackbodyColorTemperature = document.getElementById("sliderBlackbodyColorTemperature");
const spanBlackbodyColor = document.getElementById("spanBlackbodyColor");
const arrayBlackbodyColorSPD = new Array(126).fill(0);
var arrayLocusPlanckianPoint = [0, 0, 0];
let arrayBlackbodyColorRSP = [0, 0, 0];
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


const canvasReflectanceIlluminant = initializeCanvas("canvasReflectanceIlluminant", 300);
const canvasReflectanceReflectance = initializeCanvas("canvasReflectanceReflectance", 300);
const canvasReflectanceProduct = initializeCanvas("canvasReflectanceProduct", 300);
const canvasReflectanceRSP = initializeCanvas("canvasReflectanceRSP", 200);
const linkReflectanceIlluminantA = document.getElementById("linkReflectanceIlluminantA");
const linkReflectanceD65 = document.getElementById("linkReflectanceD65");
const selectReflectanceIlluminants = document.getElementById("selectReflectanceIlluminants");
let arrayReflectanceReflectanceSPD = arraySPDPink;
let arrayReflectanceReflectanceRSP = [0, 0, 0];
let arrayReflectanceIlluminantSPD = [];
let arrayReflectanceProductSPD = [];
XYILLSPDNAMES.forEach((element, index) => {
    let newOption = document.createElement("option");
    newOption.value = index; newOption.text = element;
    selectReflectanceIlluminants.appendChild(newOption);
});
selectReflectanceIlluminants.value = 2;
selectReflectanceIlluminants.addEventListener("input", updateReflectance);
linkReflectanceIlluminantA.addEventListener("click", () => { selectReflectanceIlluminants.value = 0; updateReflectance(); });
linkReflectanceD65.addEventListener("click", () => { selectReflectanceIlluminants.value = 1; updateReflectance(); });
linkReflectanceSPDGrey.addEventListener("click", () => { arrayReflectanceReflectanceSPD = arraySPDGrey; updateReflectance(); });
linkReflectanceSPDWhite.addEventListener("click", () => { arrayReflectanceReflectanceSPD = arraySPDSaturated; updateReflectance(); });
linkReflectanceSPDOlive.addEventListener("click", () => { arrayReflectanceReflectanceSPD = arraySPDOlive; updateReflectance(); });
linkReflectanceSPDPink.addEventListener("click", () => { arrayReflectanceReflectanceSPD = arraySPDPink; updateReflectance(); });
linkReflectanceSPDPurple.addEventListener("click", () => { arrayReflectanceReflectanceSPD = arraySPDPurple; updateReflectance(); });
function updateReflectance() {
    canvasReflectanceIlluminant.clearRect(0, 0, WIDTH, 300);
    canvasReflectanceReflectance.clearRect(0, 0, WIDTH, 300);
    canvasReflectanceProduct.clearRect(0, 0, WIDTH, 300);
    canvasReflectanceRSP.clearRect(0, 0, WIDTH, 200);
    arrayReflectanceIlluminantSPD = XYILLSPDS[selectReflectanceIlluminants.value];
    arrayReflectanceProductSPD = arrayReflectanceReflectanceSPD.map((value, index) => value * arrayReflectanceIlluminantSPD[index]);
    drawSPD(canvasReflectanceReflectance, arrayReflectanceReflectanceSPD);
    drawSPD(canvasReflectanceIlluminant, arrayReflectanceIlluminantSPD);
    drawSPD(canvasReflectanceProduct, arrayReflectanceProductSPD);
    arrayReflectanceRSP = drawRSP(canvasReflectanceRSP, arrayReflectanceProductSPD);
    colorBoxRGB(divReflectance, vectorMultiply(MATRIX_LMS_SRGB, arrayReflectanceRSP));
}
updateReflectance();


const canvasWhitePointsCompare = initializeCanvas("canvasWhitePointsCompare", 900);
const divWhitePointsCompareA = document.getElementById("divWhitePointsCompareA");
const divWhitePointsCompareB = document.getElementById("divWhitePointsCompareB");
const imgWhitePointsCompare = initializeImage("/media/lab/quantifying-colour/whitepoint.avif");
placeImage(imgWhitePointsCompare, canvasWhitePointsCompare);
canvasWhitePointsCompare.canvas.addEventListener("mousemove", (evt) => getColorPicker(evt, canvasWhitePointsCompare, divWhitePointsCompareA, divWhitePointsCompareB));
canvasWhitePointsCompare.canvas.addEventListener("touchmove", (evt) => getColorPicker(evt, canvasWhitePointsCompare, divWhitePointsCompareA, divWhitePointsCompareB));


const canvasLocusWhitePoint = initializeCanvas("canvasLocusWhitePoint", 600);
const selectLocusWhitePoint1 = document.getElementById("selectLocusWhitePoint1");
const selectLocusWhitePoint2 = document.getElementById("selectLocusWhitePoint2");
const selectLocusWhitePointSpace = document.getElementById("selectLocusWhitePointSpace");
const divLocusWhitePoint1 = document.getElementById("divLocusWhitePoint1");
const divLocusWhitePoint2 = document.getElementById("divLocusWhitePoint2");
const arrayLocusWhitePointWhitePoint1 = [0.638, 1.175, 1.186];
const arrayLocusWhitePointWhitePoint2 = [0.775, 1.129, 1.096];
const arrayLocusWhitePointIntensities = [0, 0, 0];
const arrayLocusWhitePointPoint = [0, 0, 0];
const arrayLocusWhitePointColor = [0, 0, 0];
const sliderLocusWhitePointIntensity = [];
let varLocusWhitePointCurrentName = [COLSPACENAMES[0]];
let arrayLocusWhitePointCtrlPoints = COLSPACES[0];
for (let i = 0; i < 3; i++) {
    sliderLocusWhitePointIntensity[i] = document.getElementById(`sliderLocusWhitePointIntensity${i}`);
    initializeSliders(sliderLocusWhitePointIntensity[i], 0.01, 2.99, 0.01, 1);
    sliderLocusWhitePointIntensity[i].addEventListener("input", () => {
        normalizeSliders(sliderLocusWhitePointIntensity, i, 3); updateLocusWhitePoint(); });
}
XYILLNAMES.forEach((element, index) => {
    let newOption1 = document.createElement("option");
    let newOption2 = document.createElement("option");
    newOption1.value = index; newOption1.text = element;
    newOption2.value = index; newOption2.text = element;
    selectLocusWhitePoint1.appendChild(newOption1);
    selectLocusWhitePoint2.appendChild(newOption2);
});
COLSPACENAMES.forEach((element, index) => {
    let newOption = document.createElement("option");
    newOption.value = index; newOption.text = element;
    selectLocusWhitePointSpace.appendChild(newOption);
});
selectLocusWhitePoint1.value = 3;
selectLocusWhitePoint2.value = 5;
selectLocusWhitePoint1.addEventListener("input", () => {
    getWhitePoint(arrayLocusWhitePointCtrlPoints, arrayXYILLS[selectLocusWhitePoint1.value], arrayLocusWhitePointWhitePoint1);
    updateLocusWhitePoint();
});
selectLocusWhitePoint2.addEventListener("input", () => {
    getWhitePoint(arrayLocusWhitePointCtrlPoints, arrayXYILLS[selectLocusWhitePoint2.value], arrayLocusWhitePointWhitePoint2);
    updateLocusWhitePoint();
});
selectLocusWhitePointSpace.addEventListener("input", () => {
    arrayLocusWhitePointCtrlPoints = COLSPACES[selectLocusWhitePointSpace.value];
    varLocusWhitePointCurrentName = [COLSPACENAMES[selectLocusWhitePointSpace.value]];
    getWhitePoint(arrayLocusWhitePointCtrlPoints, arrayXYILLS[selectLocusWhitePoint1.value], arrayLocusWhitePointWhitePoint1);
    getWhitePoint(arrayLocusWhitePointCtrlPoints, arrayXYILLS[selectLocusWhitePoint2.value], arrayLocusWhitePointWhitePoint2);
    updateLocusWhitePoint();
});
function updateLocusWhitePoint() {
    canvasLocusWhitePoint.clearRect(0, 0, WIDTH, 600);
    drawSpaceChroma(canvasLocusWhitePoint);
    for (let i = 0; i < 3; i++) arrayLocusWhitePointIntensities[i] = sliderLocusWhitePointIntensity[i].value * arrayLocusWhitePointWhitePoint2[i];
    getChromaticity(arrayLocusWhitePointCtrlPoints, arrayLocusWhitePointIntensities, arrayLocusWhitePointPoint, arrayLocusWhitePointColor);
    drawGamut(canvasLocusWhitePoint, arrayLocusWhitePointCtrlPoints, arrayLocusWhitePointIntensities, PROJMAT, "#999");
    drawSpacePoint(canvasLocusWhitePoint, arrayLocusWhitePointPoint, PROJMAT, "#999");
    colorBoxRGB(divLocusWhitePoint2, vectorMultiply(MATRIX_XYZ_RGB, arrayLocusWhitePointColor));
    for (let i = 0; i < 3; i++) arrayLocusWhitePointIntensities[i] = sliderLocusWhitePointIntensity[i].value * arrayLocusWhitePointWhitePoint1[i];
    getChromaticity(arrayLocusWhitePointCtrlPoints, arrayLocusWhitePointIntensities, arrayLocusWhitePointPoint, arrayLocusWhitePointColor);
    drawGamut(canvasLocusWhitePoint, arrayLocusWhitePointCtrlPoints, arrayLocusWhitePointIntensities);
    drawSpacePoint(canvasLocusWhitePoint, arrayLocusWhitePointPoint, PROJMAT);
    colorBoxRGB(divLocusWhitePoint1, vectorMultiply(MATRIX_XYZ_RGB, arrayLocusWhitePointColor));
    drawSpaceLocus(canvasLocusWhitePoint, arrayCHRMATXYZ, PROJMAT);
    drawLabels(canvasLocusWhitePoint, WAVXYZLABELS, WAVXYZLABELPOS);
    drawLabels(canvasLocusWhitePoint, varLocusWhitePointCurrentName, [[801, 151]]);
}


const canvasChromaticAdaptation = initializeCanvas("canvasChromaticAdaptation", 900);
const divChromaticAdaptationA = document.getElementById("divChromaticAdaptationA");
const divChromaticAdaptationB = document.getElementById("divChromaticAdaptationB");
const imgChromaticAdaptation = initializeImage("/media/lab/quantifying-colour/whitepoint.avif");
placeImage(imgChromaticAdaptation, canvasChromaticAdaptation);
canvasChromaticAdaptation.canvas.addEventListener("mousemove", (evt) => getColorPicker(evt, canvasChromaticAdaptation, divChromaticAdaptationA, divChromaticAdaptationB));
canvasChromaticAdaptation.canvas.addEventListener("touchmove", (evt) => getColorPicker(evt, canvasChromaticAdaptation, divChromaticAdaptationA, divChromaticAdaptationB));


const imgChromaticAdaptationDress = initializeImage("/media/lab/quantifying-colour/dress.avif");

const canvasChromaticAdaptationDressBlue = initializeCanvas("canvasChromaticAdaptationDressBlue", 600);
const imgChromaticAdaptationDressBlue = initializeImage("/media/lab/quantifying-colour/dress.blue.avif");
placeImage(imgChromaticAdaptationDressBlue, canvasChromaticAdaptationDressBlue, 0, 0, 400, 600);
placeImage(imgChromaticAdaptationDress, canvasChromaticAdaptationDressBlue, 400, 0, 400, 600);


const canvasChromaticAdaptationDressGold = initializeCanvas("canvasChromaticAdaptationDressGold", 600);
const imgChromaticAdaptationDressGold = initializeImage("/media/lab/quantifying-colour/dress.gold.avif");
placeImage(imgChromaticAdaptationDressGold, canvasChromaticAdaptationDressGold, 0, 0, 400, 600);
placeImage(imgChromaticAdaptationDress, canvasChromaticAdaptationDressGold, 400, 0, 400, 600);


const canvasChromaticAdaptationDressChroma = initializeCanvas("canvasChromaticAdaptationDressChroma", 600);
const linkChromaticAdaptationDressChromaCool = document.getElementById("linkChromaticAdaptationDressChromaCool");
const linkChromaticAdaptationDressChromaWarm = document.getElementById("linkChromaticAdaptationDressChromaWarm");
const varChromaticAdaptationDressChromaX1 = 180;
const varChromaticAdaptationDressChromaY1 = 40;
const varChromaticAdaptationDressChromaX2 = 280;
const varChromaticAdaptationDressChromaY2 = 140;
const arrayChromaticAdaptationDressChromaPoint1 = [varChromaticAdaptationDressChromaX1 + 880, varChromaticAdaptationDressChromaY1]
const arrayChromaticAdaptationDressChromaPoint2 = [varChromaticAdaptationDressChromaX2 + 880, varChromaticAdaptationDressChromaY2]
let arrayChromaticAdaptationDressChromaChroma1 = [];
let arrayChromaticAdaptationDressChromaChroma2 = [];
placeImage(imgChromaticAdaptationDress, canvasChromaticAdaptationDressChroma, 880, 0, 400, 600);
linkChromaticAdaptationDressChromaCool.addEventListener("click", () => {
    canvasChromaticAdaptationDressChroma.clearRect(0, 0, WIDTH, 600);
    canvasChromaticAdaptationDressChroma.drawImage(imgChromaticAdaptationDressBlue, 880, 0, 400, 600);
    updateChromaticAdaptationDressChroma(); });
linkChromaticAdaptationDressChromaWarm.addEventListener("click", () => {
    canvasChromaticAdaptationDressChroma.clearRect(0, 0, WIDTH, 600);
    canvasChromaticAdaptationDressChroma.drawImage(imgChromaticAdaptationDress, 880, 0, 400, 600);
    updateChromaticAdaptationDressChroma(); });
function updateChromaticAdaptationDressChroma() {
    drawSpaceChroma(canvasChromaticAdaptationDressChroma);
    drawSpaceLocus(canvasChromaticAdaptationDressChroma, arrayCHRMATXYZ, PROJMAT);
    drawLabels(canvasChromaticAdaptationDressChroma, WAVXYZLABELS, WAVXYZLABELPOS);
    arrayChromaticAdaptationDressChromaChroma1 = getXYPixel(canvasChromaticAdaptationDressChroma, varChromaticAdaptationDressChromaX1, varChromaticAdaptationDressChromaY1, 880, 0);
    arrayChromaticAdaptationDressChromaChroma2 = getXYPixel(canvasChromaticAdaptationDressChroma, varChromaticAdaptationDressChromaX2, varChromaticAdaptationDressChromaY2, 880, 0);
    arrayChromaticAdaptationDressChromaChroma1 = vectorMultiply(PROJMAT, arrayChromaticAdaptationDressChromaChroma1.concat(1));
    arrayChromaticAdaptationDressChromaChroma2 = vectorMultiply(PROJMAT, arrayChromaticAdaptationDressChromaChroma2.concat(1));
    drawSpaceLine(canvasChromaticAdaptationDressChroma, arrayChromaticAdaptationDressChromaChroma1, arrayChromaticAdaptationDressChromaPoint1, IDENTITY);
    drawSpaceLine(canvasChromaticAdaptationDressChroma, arrayChromaticAdaptationDressChromaChroma2, arrayChromaticAdaptationDressChromaPoint2, IDENTITY);
    drawSpacePoint(canvasChromaticAdaptationDressChroma, arrayChromaticAdaptationDressChromaChroma1, IDENTITY);
    drawSpacePoint(canvasChromaticAdaptationDressChroma, arrayChromaticAdaptationDressChromaChroma2, IDENTITY);
    drawSpacePoint(canvasChromaticAdaptationDressChroma, arrayChromaticAdaptationDressChromaPoint1, IDENTITY);
    drawSpacePoint(canvasChromaticAdaptationDressChroma, arrayChromaticAdaptationDressChromaPoint2, IDENTITY);
}


Promise.all([loadImage(imgChromaticAdaptationDress), loadImage(CHRDIAGRAM)]).then(() => {
    updateLocusRatio();
    updateLocusGamutTwo();
    updateLocusGamutCIE();
    updateLocusGamutMultiple();
    updateBlackbodyColor();
    updateLocusPlanckianLED();
    updateLocusPlanckianCCT();
    updateLocusIlluminants();
    updateLocusWhitePoint();
    updateChromaticAdaptationDressChroma();
});



// functions

function loadImage(imageObject) {
    return new Promise((resolve, reject) => {
        imageObject.onload = resolve;
        imageObject.onerror = reject;
    });
}

function initializeImage(imagePath) {
    const imageObject = new Image();
    imageObject.src = imagePath;
    return imageObject;
}

function placeImage(imageObject, canvas, x = 0, y = 0, dw = null, dh = null) {
    imageObject.addEventListener("load", () => {
        if (dw || dh) { canvas.drawImage(imageObject, x, y, dw, dh); }
        else { canvas.drawImage(imageObject, x, y); }
        imageObject.style.display = "none";
    });
}

function getXYPixel(canvas, x, y, sx = 0, sy = 0) {
    const img = canvas.getImageData(sx, sy, canvas.canvas.width - sx, canvas.canvas.height - sy).data;
    const srgbPos = y * ((canvas.canvas.width - sx) * 4) + x * 4;
    const srgbVector = [img[srgbPos] / 255, img[srgbPos + 1] / 255, img[srgbPos + 2] / 255];
    const XYZ = vectorMultiply(MATRIX_SRGB_XYZ, srgbVector);
    const sum = XYZ[0] + XYZ[1] + XYZ[2];
    return [XYZ[0] / sum, XYZ[1] / sum, XYZ[2] / sum];
}

function getColorPicker(evt, canvas, colorBox, colorBoxOpt = null) {
    canvas.canvas.style.cursor = "crosshair";
    const rect = canvas.canvas.getBoundingClientRect();
    const x = (evt.clientX - rect.left) * (canvas.canvas.width / rect.width);
    const y = (evt.clientY - rect.top) * (canvas.canvas.height / rect.height);
    let data = canvas.getImageData(x, y, 1, 1).data;
    if (colorBoxOpt == null) {
        colorBox.style.background = `rgb(${data[0]} ${data[1]} ${data[2]} / ${data[3] / 255})`;
        return data;
    }
    if (y > canvas.canvas.height / 2) {
        colorBox.style.background = `rgb(${data[0]} ${data[1]} ${data[2]} / ${data[3] / 255})`;
        data = canvas.getImageData(x, y - canvas.canvas.height / 2, 1, 1).data;
        colorBoxOpt.style.background = `rgb(${data[0]} ${data[1]} ${data[2]} / ${data[3] / 255})`;
    }
    else {
        colorBoxOpt.style.background = `rgb(${data[0]} ${data[1]} ${data[2]} / ${data[3] / 255})`;
        data = canvas.getImageData(x, y + canvas.canvas.height / 2, 1, 1).data;
        colorBox.style.background = `rgb(${data[0]} ${data[1]} ${data[2]} / ${data[3] / 255})`;
    }
    return;
}

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

function drawSpaceChromaFill(canvas, locus = arrayCHRMATRGB, projection = PROJMAT, color = "#fff") {
    canvas.fillStyle = color;
    canvas.beginPath();
    canvas.moveTo(locus[0][0] * projection[0][0] + projection[0][3], locus[1][0] * projection[1][1] + projection[1][3])
    for (let i = 1; i < locus[0].length; i++)
        canvas.lineTo(locus[0][i] * projection[0][0] + projection[0][3], locus[1][i] * projection[1][1] + projection[1][3])
    canvas.fill();
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

function drawSpaceTriangle(canvas, k = 1, transformation = TRANSFMAT, color = "#000", width = 2, fill = null) {
    let points = [[k, 0, 0, 1], [0, k, 0, 1], [0, 0, k, 1], [k, 0, 0, 1]];
    let vertex = vectorMultiply(transformation, points[0]);
    if (fill) canvas.fillStyle = fill;
    canvas.strokeStyle = color;
    canvas.lineWidth = width;
    canvas.beginPath();
    canvas.moveTo(vertex[0], vertex[1]);
    for (let i = 1; i < points.length; i++) {
        vertex = vectorMultiply(transformation, points[i]);
        canvas.lineTo(vertex[0], vertex[1]);
    }
    if (fill) canvas.fill();
    canvas.stroke();
}

function drawSpaceSlice(canvas, k = 1, transformation = TRANSFMAT, res = 1) {
    const resolution = res / (50 * k);
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

function RGBtoXYZClip(rgbArray) {
    let xyz = vectorMultiply(MATRIX_XYZ_RGB, rgbArray);
    if (xyz[0] > 1 || xyz[1] > 1 || xyz[2] > 1) xyz[0] = xyz[1] = xyz[2] = 0.85;
    if (xyz[0] < 0 || xyz[1] < 0 || xyz[2] < 0) xyz[0] = xyz[1] = xyz[2] = 0.85;
    return xyz;
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
        canvas.lineTo(i * 10 + 15, height);
        canvas.stroke();
    }
}

function drawRSP(canvas, values = arraySPDSaturated, colors = LMSCOLORS, means = LMSMEANS, deviations = LMSDEVNS, magnitudes = LMSMAGNS, norms = LMSNORMS, cones = CONES, correction = 1, y = 200, width = 2) {
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
    for (let i = 0; i <= length; i++) {
        canvas.lineTo(x + i, y + amplitude * Math.sin(3.14 * i / length) * Math.sin(i * wavelength));
    }
    canvas.stroke();
}

function getResponses(values = arraySPDSaturated, means = LMSMEANS, deviations = LMSDEVNS, magnitudes = LMSMAGNS, norms = LMSNORMS) {
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

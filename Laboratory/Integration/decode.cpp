#include "makelib.hpp"
#include <iostream>
#include <fstream>
#include <cstdlib>

static std::vector<uint8_t> ReadAllBytes(char const *filename)
{
  std::ifstream ifs(filename, std::ios::binary | std::ios::ate);
  std::ifstream::pos_type pos = ifs.tellg();
  std::vector<uint8_t> result(pos);
  ifs.seekg(0, std::ios::beg);
  ifs.read(reinterpret_cast<char *>(&result[0]), pos);
  return result;
}

int main(int argc, char **argv)
{
  const auto bytes = ReadAllBytes(argv[1]);

#if 1
  // help diagnose encode/decode problems: 
  // this hexdump should match the `od -t x1 *.enc` output exactly.
  for (int i = 0; i < bytes.size(); i++) 
  {
    uint8_t b = bytes[i];
    if (i % 16 == 0)
    {
      fprintf(stderr, "\n%08x ", i);
    }
    fprintf(stderr, "%02x ", b);
  }
  fprintf(stderr, "\n");
#endif

  Library lib;
  Library::decodeInto(bytes, lib);

  is_valid(lib);

  return 0;
}

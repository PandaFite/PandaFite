var host = "mattunderscore.co"
if (window.location.host == host && window.location.protocol != "https:") {
  window.location.protocol = "https:"
}
$(function() {
  $('[data-toggle="tooltip"]').tooltip()
})

// Activate current main nav item
$(function() {
  var $anchorToDeactivate = $('#main-nav a[aria-current]')
  $anchorToDeactivate.removeAttr('aria-current')

  var pathArray = location.pathname.split('/')
  var firstLevelPath = pathArray[1]
  var $anchorToActivate = $('#main-nav a[href*="' + firstLevelPath + '"]').closest('a')
  $anchorToActivate.attr('aria-current', 'page')
})


// Join page navigation behavior
function swapJoinContent(hash) {
  // Guard against missing or malformed hash
  if (!hash || typeof hash !== 'string') {
    return false
  }

  hash = hash.split('-')[0] // handle scenario involving "child page anchors"

  var $contentElements = $('.join-content > div')
  var $contentElementToActivate = $(`#${hash}`)
  var $navElements = $('.subnav li')
  var $navElementToActivate = $navElements.has('a[href$="#' + hash + '"]')

  // Guard against answer that is not present on the page
  if (($contentElementToActivate.length === 0) || ($navElementToActivate.length === 0)) {
    return false
  }

  $contentElements.hide()
  $contentElementToActivate.show()

  $navElements.removeClass('current')
  $navElements.find('a').removeAttr('aria-current')

  $navElementToActivate.addClass('current')
  $navElementToActivate.find('a').attr('aria-current', 'location')

  $('html, body').scrollTop(0);
}

$(function() {
  $('.join-content > div').not('#application').hide()

  if (location.hash.length > 0) {
    var hash = location.hash.substr(1);
    swapJoinContent(hash)
  }

  var $navAnchors = $('.join-us .subnav a')

  var navPaths = $.map($navAnchors, function(anchor) {
    return anchor.getAttribute('href')
  })

  var $pageAnchors = $('.join-content a')
  $pageAnchors = $pageAnchors.filter(function(index) {
    return $.inArray(this.getAttribute('href'), navPaths) != -1;
  })

  $allAnchors = $navAnchors.add($pageAnchors)

  $allAnchors.on('click', function(e) {
    e.preventDefault()

    var dest = $(this).attr('href')
    history.pushState(null, null, dest)

    var hash = this.hash.substr(1)
    swapJoinContent(hash)
  })
})

// Form file upload
$(function() {
  $('#resume-input-file').change(function() {
    var fileName = this.files[0].name
    $('.btn-file').addClass('file-width-max')
    $('#resume-input-file + span').html(fileName)
  })
})

// Form icons
$(function() {
  $('.form-icons div').click(function(e) {
    e.preventDefault()

    var targetElementId = $(this).data('toggle')

    if ($(this).attr('aria-expanded') == 'false') {
      $(this).attr('aria-expanded', true)
    } else {
      $(this).attr('aria-expanded', false)
    }

    $(this).find('i').toggleClass('current')
    $(`#${targetElementId}`).toggleClass('sr-only')
  })
})
